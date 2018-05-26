from boa.builtins import list, concat, range, concat, take
from boa.interop.Neo.Storage import GetContext, Get, Put, Delete
from serialize import serialize_array, serialize_var_length_item, deserialize_bytearray
from boa.interop.Neo.Runtime import Log, Notify

"""
@Function: fillMaster
@Contributor: dliang
@Param: {string} name
@Return: void
Purpose: for each register call, append the name to master list
"""
def fillMaster(name):
    masterbList = Get(GetContext(), '1')
    masterList = deserialize_bytearray(masterbList)
    masterList.append(name)
    masterList.append(',')
    masterbList = serialize_array(masterList)
    Put(GetContext(), '1', masterbList)

"""
@Function: register
@Contributor: dliang
@Param: {list of strings} args
        1. {string} name
        2. {string} address <--- nope not using that
@Return: void by default otherwise return false if conflicts with masterList
Purpose: This will register the user and their address to the smart contract
         and add the name to master list
"""
def register(args):
    if args[0] == '1':
        Log("please no - this is for master list")
        return 0
    else:
        isMasterThere = Get(GetContext(), '1')
        if not isMasterThere:
            # create master here
            masterList = serialize_array([])
            Put(GetContext(), '1', masterList)

    isUserThere = Get(GetContext(), args[0])
    isAddrThere = Get(GetContext(), args[1])
    if isUserThere:
        Log("Already registered here")
    else:
        bstuff = serialize_array([])
        Put(GetContext(), args[0], args[1])
        Put(GetContext(), args[1], bstuff)
        fillMaster(args[0]) # only want the names
    return 1

"""
@Function: createpost
@Contributor: Colin
@Param: {list} args
        1. {string} id
        2. {string} owner
        3. {string} title
        4. {string} description of item
        5. {int} price
        6. {int} amount
        7. {string} purchased? status
@Return: void
Purpose: for each register call, append the name to master list
```createPost: (id, owner, title, desc, price, amount)```
"""
def createpost(args):
    a = Get(GetContext(), args[1])
    # checking if user exist or not
    if not a:
        Log("Cant createpost - user is not registered")
        return 0
    else:

        # next thing to do once everything is implemented
        # check if the post exist or not and do stuff

        # right now - getting information
        addr = Get(GetContext(), args[1])
        bList = Get(GetContext(), addr)
        stuff = deserialize_bytearray(bList) # should be getting the array of ids here

        # adding id to the user then setting post to id
        print(args[0])
        if args[0] not in stuff:
            stuff.append(args[0])
            stuff.append(',')
            bList = serialize_array(stuff) # it back
            Put(GetContext(), addr, bList) # storing it to the id
            print("done allocating id to user")

        # adding post to id here
        postInfo = [args[1],';', args[2],';', args[3],';', args[4],';', args[5]]]

        finalInfo = serialize_array(postInfo)
        Put(GetContext(), args[0], finalInfo)
        print("done here")
        return 1


"""
@Function: deletepost
@Contributor: <whoever gets to it>
@Param: {list} args
        1. {string} name
        2. {string} id
@Return: void
Purpose: This is used to delete a post

- there's a slight problem in trying to remove an element, seems to evaluate the list
differently from what I expected.
"""
def deletepost(args):
    addr = Get(GetContext(), args[0])
    if not addr:
        Log("cant delete")
        return 0
    else:
        stuff = Get(GetContext(), addr) # getting the binary form of list
        dList = deserialize_bytearray(stuff) # getting the IDs
        length = len(dList)
        print(length)

        # checking if the list is empty
        if length == 0 or length < 0:
            print("nothing in list")
            dList = []
            bList = serialize_array(dList)
            Put(GetContext(), addr, bList) # id -> post
            print("done setting it up")
            return 1

        # reallocating the elements to a new list
        tempDList = [] # recreating and allocating the list to this one
        for entry in range(0, length):
            print("allocating")

            if dList[entry] == concat("", args[1]):
                print("should be here only one time")
                print(dList[entry])

                # deleting any remains of args[1] or the selected id
                Delete(GetContext(), args[1])
            else:
                tempDList.append(dList[entry])

        # setting the new list to the address
        bList = serialize_array(tempDList)
        Put(GetContext(), addr, bList)
        print("done deleting")
        return 1

"""
@Function: select
@Contributor: dliang
@Param: {list} args
        1. {string} name or id whatever
@Return: void
Purpose: This is mainly used for testing cases but it uses the name and prints the first
         element or value the address of the name is holding.

         this does not print out the post or does it?

         Highly don't recommend this outside of testing purposes
"""
def select(args):

    addr = Get(GetContext(), args[0])
    # i got the addr now
    stuff = deserialize_bytearray(addr)
    length = len(stuff)
    print("BEGINNING PRINTING OF:")
    print(args[0])
    print(length)

    for i in range(0, length):
        print("there you go: ")
        print(stuff[i])
    print("get out of here from select the testing land")
    return 1

"""
@Function: isregister
@Contributor: Colin
@Param: {string} name
@Return: boolean
Purpose: checks if username is registered or not
"""
def isregister(args):
    a = Get(GetContext(), args[0])
    if not a:
        Log("the user is not registered")
        return 0
    else:
        Log("the user is registered")
        return 1

"""
@Function: editPost
@Contributor: Colin, dliang
@Param: same as createpost

@Return: boolean
Purpose: Runs the smart contract and acts accordingly to the user and their respective args
"""
def editpost(args):
    length = 7
    i = 1 # trying to avoid "ID" from being tagged
    userPosts = Get(GetContext(), args[0]) # getting the id
    if not userPosts:
        Log("not a valid user, cant edit post")
        return 0
    else:
        print("editing")
        Delete(GetContext(), args[0])
        createpost(args)
        print("done with editing")
    return 1


def Main(operation, args):
    if operation == "register":
        print("register op - here")
        register(args)
    elif operation == "isregister":
        print("checking if registered op")
        isregister(args)
    elif operation == "select":
        print("select op - here")
        select(args)
    elif operation == "createpost":
        print("creating a post - here")
        createpost(args)
    elif operation == "deletepost":
        print("deleting a post")
        deletepost(args)
    elif operation == "editpost":
        print("editing a post")
        editpost(args)
    else:
        print("what op?")
        return 0
    return 1
