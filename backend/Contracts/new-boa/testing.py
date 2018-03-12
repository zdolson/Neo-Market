from boa.builtins import list as neoList, concat, range 
from boa.interop.Neo.Storage import GetContext, Get, Put, Delete
""" CHECKLIST: 
    1. make sure list of one item work
    2. call same function and see if item is there and add another one to it 
    3. can you print the entire set of list? 
    4. can i select a certain index of the list? 
    
    AFTER THAT REPORT BACK
""" 
# set one nuame only at the moment 
# then do multiple names 
def register(args): 
    print("in register") 
    stuff = list()
    #b = list(length=2)
    a = args[0] 
    b = args[1]
    stuff.append("eggs") 
    bstuff = serialize_array(stuff)
    Put(GetContext(), a, b)
    Put(GetContext(), b, bstuff)
    print("donnnnne")
    
# just pick user name, and index of the list
def select(args): 
    addr = Get(GetContext(), args[0]) 
    # i got the addr now 
    bList = Get(GetContext(), addr) 
    # i got the byte array now - time to deserialize
    stuff = deserialize_bytearray(bList)
    print("printing the value of the list now") 
    print(stuff[args[1]) 
    print("done with select") 

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
    else: 
        print("what op?")
        return False
