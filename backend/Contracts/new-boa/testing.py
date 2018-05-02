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
        2. {string} address
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
    if isAddrThere or isUserThere:
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
        1. {string} owner 
        2. {string} title
        3. {string} description of item 
        4. {int} price 
        5. {int} amount
@Return: void 
Purpose: for each register call, append the name to master list
```createPost: (id, owner, title, desc, price, amount)```
"""
def createpost(args):
    a = Get(GetContext(), args[1])
    if not a:
        Log("Cant createpost - user is not registered")
        return 0
    else:
        addr = Get(GetContext(), args[1])
        bList = Get(GetContext(), addr)
        stuff = deserialize_bytearray(bList)
        length = 6
        n = 0
        while(n < length):
            stuff.append(args[n])
            if(n==5): break
            stuff.append(',')
            n += 1
        stuff.append(';')
        Log(len(stuff)) # this may break it here
        bList = serialize_array(stuff)
        Put(GetContext(), addr, bList)
        return 1

"""
@Function: deletepost
@Contributor: <whoever gets to it> 
@Param: {list} args
        1. {string} args[0] 
@Return: void 
Purpose: This is used to delete a post

- there's a slight problem in trying to remove an element, seems to evaluate the list
differently from what I expected.
"""
def deletepost(args):
    addr = Get(GetContext(), args[0])
    bList = Get(GetContext(), addr)
    if not addr:
        Log("cant delete")
        return 0
    else:
        stuff = deserialize_bytearray(bList)
        stuff = None
        bList = serialize_array(stuff)
        Put(GetContext(), addr, bList)
        return 1

"""
@Function: select
@Contributor: dliang 
@Param: {list} args
        1. {string} args[0] 
@Return: void 
Purpose: This is mainly used for testing cases but it uses the name and prints the first 
         element or value the address of the name is holding.
"""
def select(args):
    addr = Get(GetContext(), args[0])
    # i got the addr now
    bList = Get(GetContext(), addr)
    # i got the byte array now - time to deserialize
    stuff = deserialize_bytearray(bList)
    print(stuff[args[1]])
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
@Param: {string} operation 
        {list} args
@Return: boolean
Purpose: Runs the smart contract and acts accordingly to the user and their respective args
"""
def editPost(args):
    length = 5
    i = 0
    userPosts = Get(GetContext(), args[1])
    itemList = Get(GetContext(), userPosts)
    if not userPosts:
        Log("not a valid user, cant edit post")
        return 0
    else:
        dpostInfo = deserialize_bytearray(itemList)
        print(dpostInfo[2])
        while(i < length):
            if(args[i] != 'N/A'):
                dpostInfo[i] = args[i]
            else:
                print("Not changing array value")
            i += 1
        finalPosts = serialize_array(dpostInfo)
        print("here is dpostInfo")
        print(dpostInfo)
        print("here is finalPosts:")
        print(finalPosts)
        Put(GetContext(), userPosts, finalPosts)
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
        editPost(args)
    else:
        print("what op?")
        return 0
    return 1
