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
    combine = args[0]+"|"+args[1]+"|"+args[2]+"|"+args[3]+"|"+args[4]+"|"args[5]
    addr = Get(GetContext(), args[1])
    bList = Get(GetContext(), addr) 
    stuff = deserialize_bytearray(bList)
    stuff.append(combine)
    Log('new lenght of stuff:')
    Log(len(stuff)) # this may break it here
    bList = serialize_array(stuff)
    Put(GetContext(), addr, bList)
    Log("printing post down there in the format")
    Log(combine)
    
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
    elif operation == "createpost":
        print("creating a post - here") 
        createpost(args)
    elif operation == "deletepost":
        print("deleting a post") 
        deletepost(args)
    else: 
        print("what op?")
        return False
    return True
