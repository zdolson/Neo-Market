from boa.builtins import list, concat, range, concat, take
from boa.interop.Neo.Storage import GetContext, Get, Put, Delete
from serialize import serialize_array, serialize_var_length_item, deserialize_bytearray
from boa.interop.Neo.Runtime import Log, Notify
""" CHECKLIST:
    1. make sure list of one item work - done
    2. call same function and see if item is there and add another one to it - done
    3. can you print the entire set of list? - TODO: DO LAST - no need to rush this one
    4. can i select a certain index of the list? - ready up

    AFTER THAT REPORT BACK

    1. can i create a post? - starting at 5:15
    2. can i add another post to the list?
    3. can i select an index of that post?
    4. can i delete a post?
    5. can i "buy" - NOTE cannot use other wallet so that's an issue leave that to zack

    SHOULD BE DONE BY HERE
    1. is there any bugs?
    2. what are the test cases for this code?
    3. can it be improved upon?
"""
# splitting things up here - helper to create master
def fillMaster(name):
    masterbList = Get(GetContext(), '1')
    masterList = deserialize_bytearray(masterbList)
    masterList.append(name)
    masterList.append(',')
    masterbList = serialize_array(masterList)
    Put(GetContext(), '1', masterbList)

# params 'register' [username, addr]
def register(args):
    if args[0] == '1':
        Log("please no - this is for master list")
        return False
    else:
        isMasterThere = Get(GetContext(), '1')
        if not isMasterThere:
            # create master here
            masterList = serialize_array([])
            Put(GetContext(), '1', masterList)
    print("in register")
    print("after creation of list")
    #b = list(length=2)
    a = args[0] # no need to do this tbh
    b = args[1]
    print("allocating a and b")
    bstuff = serialize_array([])
    print("done serializing array here")
    Put(GetContext(), a, b)
    Put(GetContext(), b, bstuff)
    print("donnnnne")
    fillMaster(args[0]) # only want the names

# params 'addone' [username, one_item]
def addone(args):
    addr = Get(GetContext(), args[0])
    bstuff = Get(GetContext(), addr)
    stuff = deserialize_bytearray(bstuff)
    stuff.append(args[1])
    stuff_length = len(stuff)
    Log('new length of stuff:')
    Log(stuff_length)
    bstuff = serialize_array(stuff)
    Put(GetContext(), addr, bstuff)
    print("done with addone")
# params 'createpost' [id, owner, title, desc, price, amount]
def createpost(args):
    a = Get(GetContext(), args[1])
    if not a:
	print("Cant createpost - user is not registered")
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
        Log('new length of stuff:')
        Log(len(stuff)) # this may break it here
        bList = serialize_array(stuff)
        Put(GetContext(), addr, bList)
        Log("printing post down there in the format")
        return 1

# params 'delete' [owner, index]
def deletepost(args):
    addr = Get(GetContext(), args[0])
    bList = Get(GetContext(), addr)
    stuff = deserialize_bytearray(bList)
    stuff[args[1]] = "0"
    bList = serialize_array(stuff)
    Put(GetContext(), addr, bList)
    print("done with setting the post to 0")

# params 'select' [username, index of item]
def select(args):
    addr = Get(GetContext(), args[0])
    # i got the addr now
    bList = Get(GetContext(), addr)
    # i got the byte array now - time to deserialize
    stuff = deserialize_bytearray(bList)
    print("printing the value of the list now")
    print(stuff[args[1]])
    print("done with select")

# # params 'getposts' [username] - will do multiple usernames as well
# def getposts(args):
#     for i in range(len(args)):
#         addr = Get(GetContext(), args[i])
#         bList = Get(GetContext(), addr)
#         stuff = deserialize_bytearray(bList)
#         for j in range(len(stuff)):
#             Log(stuff[j])

# # params 'getallposts' []
# # no args please
# def getallposts():
#     masterbList = Get(GetContext(), '1')
#     masterList = deserialize_bytearray(masterbList)
#     for i in range(len(masterList)):
#         Log(i) # this is the name of a registered person
#         addr = Get(GetContext(), i)
#         bList = Get(GetContext(), addr)
#         stuff = deserialize_bytearray(bList)
#         for j in range(len(stuff)):
#             Log(j)
#     ## should be done here
#     Log("done getting all post")

# params 'isregister' [username]
def isregister(args):
    a = Get(GetContext(), args[0])
    if not a:
        print("the user is not registered")
        return 0
    else:
        print("the user is registered")
        return 1

# params 'editpost' [ID,Owner,title,desc,price,amount]
# put N/A at a given index if you dont wish to change value]
def editPost(args):
    length = 5
    i = 0
    userPosts = Get(GetContext(), args[1])
    itemList = Get(GetContext(), userPosts)
    if not userPosts:
        print("not a valid user, cant edit post")
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
    # elif operation == "getposts":
    #     print("getpost op - here")
    #     getposts(args)
    elif operation == "addone":
        print("addone op - here")
        addone(args)
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
        return False
    return True
