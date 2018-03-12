from boa.builtins import list, concat 
from boa.interop.Neo.Storage import GetContext, Get, Put, Delete


# set one nuame only at the moment 
# then do multiple names 
def register(args): 
    print("in register") 
    a = list()
    b = list(length=2)
    a.append(args[0])
    Put(GetContext, args[0], args[1])

def isregister(args):
    a = GetContext(GetContext, args[0]) 
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
    else: 
        print("what op?")
        return False