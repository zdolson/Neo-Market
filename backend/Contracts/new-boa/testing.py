from boa.builtins import list, concat 
from boa.interop.Neo.Storage import GetContext, Get, Put, Delete
# set one nuame only at the moment 
# then do multiple names 
def register(args): 
    print("in register") 
    a = list()
    b = list(length=2)
    c = args[0] 
    d = args[1]
    a.append(c)
    Put(GetContext, c, d)

def isregister(args):
    pass 

def Main(operation, args): 
    if operation == "register":
        print("register op - here")
        register(args) 
    elif operation == "isregister":
        print("checking if registered op") 
        isregister(args)
    else: 
        print("what op?")