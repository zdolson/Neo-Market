from boa.builtins import list, concat, range, take
from boa.interop.Neo.Storage import GetContext, Get, Put, Delete
from boa.interop.Neo.Runtime import Log, Notify, Serialize, Deserialize

"""
@Function: fillMaster
@Contributor: dliang 
@Param: {string} name
@Return: void 
Purpose: for each register call, append the name to master list
"""
def fillMaster(name):
    masterbList = Get(GetContext(), '1')
    masterList = Deserialize(masterbList)
    masterList.append(name)
    masterList.append(',')
    masterbList = Serialize(masterList)
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
        Log("This is only avaliable for MasterList")
        return False
    else:
        isMasterThere = Get(GetContext(), '1')
        if not isMasterThere:
            # create master here
            masterList = Serialize([])
            Put(GetContext(), '1', masterList)
    print("in register")
    # a = args[0] # no need to do this tbh
    # b = args[1]
    # print("allocating a and b")
    bstuff = Serialize([]) # allocating an empty list to the user's address
    print("done serializing array here")
    Put(GetContext(), args[0], args[1])
    Put(GetContext(), args[1], bstuff)
    print("done registering")
    fillMaster(args[0]) # only want the names

# params 'createpost' [id, owner, title, desc, price, amount]
def createpost(args):
    addr = Get(GetContext(), args[1])
    bList = Get(GetContext(), addr)
    stuff = Deserialize(bList)
    stuff.append(args[0])
    stuff.append(',')
    stuff.append(args[1])
    stuff.append(',')
    stuff.append(args[2])
    stuff.append(',')
    stuff.append(args[3])
    stuff.append(',')
    stuff.append(args[4])
    stuff.append(',')
    stuff.append(args[5])
    stuff.append(';')
    Log('new length of stuff:')
    Log(len(stuff)) # this may break it here
    bList = Serialize(stuff)
    Put(GetContext(), addr, bList)
    Log("printing post down there in the format")

"""
@Function: select
@Contributor: <whoever gets to it> 
@Param: {list} args
        1. {string} args[0] 
@Return: void 
Purpose: This is used to delete a post
"""def deletepost(args):
    addr = Get(GetContext(), args[0])
    bList = Get(GetContext(), addr)
    stuff = Deserialize(bList)
    stuff[args[1]] = "0"
    bList = Serialize(stuff)
    Put(GetContext(), addr, bList)
    print("done with setting the post to 0")

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
    stuff = Deserialize(bList)
    print("printing the value of the list now")
    print(stuff[args[1]])
    print("done with select")

# params 'isregister' [username]
def isregister(args):
    a = GetContext(GetContext(), args[0])
    if not a:
        print("the user is not registered")
        return False
    else:
        print("the user is registered")
        return True

"""
@Function: fillMaster
@Contributor: Colin, dliang
@Param: {string} operation 
        {list} args
@Return: boolean
Purpose: Runs the smart contract and acts accordingly to the user and their respective args
"""
def Main(operation, args):
    boolStatus = True # assuming it's true by default
    if operation == "register":
        print("register op - here")
        if len(args) != 2:
            Notify("wrong length of args") 
            boolStatus = False
        register(args)
    elif operation == "isregister":
        print("checking if registered op")
        if len(args) != 2:
            Notify("wrong length of args")
            boolStatus = False
        isregister(args)
    elif operation == "select":
        print("select op - here")
        if len(args) != 2:
            Notify("wrong length of args")
            boolStatus = False
        select(args)
    elif operation == "createpost":
        print("creating a post - here")
        if len(args) != 2:
            Notify("wrong length of args")
            boolStatus = False
        createpost(args)
    elif operation == "deletepost":
        print("deleting a post")
        if len(args) != 2:
            Notify("wrong length of args")
            boolStatus = False
        deletepost(args)
    else:
        Notify("Bad operation name or it does not exist") 
        boolStatus = False
    return boolStatus
