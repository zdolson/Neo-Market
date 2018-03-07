""" my god this is difficult """

from boa.blockchain.vm.Neo.Storage import GetContext, Put, Delete, Get


# this registers a user to their addr in the ocntract
# then it registers their address to a list of list 
def register(name, addr): 
    a = Get(GetContext, name) 
    print("checking if user exist") 
    if not a: 
        print("user does not exist - registering")
        Put(GetContext, name, addr)
        print("finish registering")
    else: 
        print("user already exist")
        return False 
    return True

# this checks if the user is registered or not
def isregister(name):
    a = Get(GetContext, name) 
    if not a:
        print("there is no user in contract") 
        return False
    else: 
        print("user is in contract")
        return True

def Main(operation, args):
    print("starting")
    if operation == "register":
        a = args[0]
        b = args[1]
        print("in op - register")
        register(b, a)
    elif operation == "isregister":
        a = args[0]
        print("in op - isRegister")
        isregister(a) 
    else:
        print("no op exist - ")
        print(operation) 
    print("done") 
