from boa.builtins import list, concat, range, concat, take
from boa.interop.Neo.Storage import GetContext, Get, Put, Delete
from serialize import serialize_array, serialize_var_length_item, deserialize_bytearray
from boa.interop.Neo.Runtime import Log, Notify
""" CHECKLIST: 
    1. make sure list of one item work - done 
    2. call same function and see if item is there and add another one to it - done
    3. can you print the entire set of list? - done 
    4. can i select a certain index of the list? - ready up 
    
    AFTER THAT REPORT BACK
""" 
# splitting things up here - helper to create master 
def fillMaster(name): 
    masterbList = Get(GetContext(), '1')
    masterList = deserialize_bytearray(masterbList) 
    masterList.append(name) 
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

# params 'getposts' [username] - will do multiple usernames as well
def getposts(args): 
    for i in range(len(args)): 
        addr = Get(GetContext(), i)
        bList = Get(GetContext(), addr)
        stuff = deserialize_bytearray(bList)
        for j in range(len(stuff)): 
            Log(j)
    
# params 'getallposts' [] 
# no args please
def getallposts(): 
    masterbList = Get(GetContext(), '1') 
    masterList = deserialize_bytearray(masterbList)
    for i in range(len(masterList)):
        Log(i) # this is the name of a registered person 
        addr = Get(GetContext(), i)
        bList = Get(GetContext(), addr) 
        stuff = deserialize_bytearray(bList)
        for j in range(len(stuff)): 
            Log(j)
    ## should be done here 
    Log("done getting all post")

# params 'isregister' [username] 
def isregister(args):
    a = GetContext(GetContext(), args[0]) 
    if not a: 
        print("the user is not registered") 
        return False 
    else: 
        print("the user is registered") 
        return True


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
    elif operation == "getposts":
        print("getpost op - here") 
        getposts(args)
    elif operation == "addone":
        print("addone op - here")
        addone(args)
    else: 
        print("what op?")
        return False
    return True
