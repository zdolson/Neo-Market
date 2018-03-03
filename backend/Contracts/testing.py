""" my god this is difficult """

from boa.blockchain.vm.Neo.Storage import GetContext, Put, Delete, Get
from post import init_Post
# from serialize import serialize_array, serialize_var_length_item
from boa.code.builtins import list, concat

# this registers a user to their addr in the ocntract
# then it registers their address to a list of list 
def register(name, addr): 
    a = Get(GetContext, name) 
    print("checking if user exist") 
    if not a: 
        print("user does not exist - registering")
        lists = list(length=10)
        # bLists = serialize_array(lists)
        Put(GetContext, name, addr)
        print("entering the list into the context")
        Put(GetContext, addr, lists) 
        print("finish registering") 
    else: 
        print("user already exist") 
    return True

# this checks if the user is registered or not
def isregister(name, addr):
    a = Get(GetContext, name) 
    if not a:
        print("there is no user in contract") 
        return True 
    else: 
        print("user is in contract")
        return False

# this uses the buyer's address to purchase the address of the seller 
# perhaps the item of the seller and the amount of it
def buy(buyerAddr, sellerAddr, title, amount): 
    buyerExist = Get(GetContext, buyerAddr)
    if not buyerExist:
        print("buyer does not exist")
        return False
    
    sellerExist = Get(GetContext, sellerAddr)
    if not sellerExist: 
        print("seller does not exist") 
        return False 

    if title not in sellerExist:
        print("item does not exist") 
        return False 
    elif title in sellerExist: 
        pass ## check for the amount in the list 

        # test on how to work with the listings first tho

    print("purchased")
    # after purchasing, how do I confirm it actually goes through for the user?
    return True     


# this creates the posting and appens that list of params 
# to the list of list (backlog) at the moment
def createPost(owner, title, desc, price, amount): 
    pass 

# this is a getter for createPost and gets the selected list and returns it 
# more descriptions to come *backlog*
def getPost(owner, title): 
    pass 

# this is to check if it was possible to build a class in neo-python and 
# return true if it does, that's it 
def getclass(owner, title, desc, price, amount):
    post = init_Post(owner, title, desc, price, amount)
    print("this is the owner") 
    print(post.owner)
    print("im selling this shit") 
    print(post.title, post.desc)
    print("for this much : ") 
    print(post.price, post.amount)
    print("GOING TO SLEEP BOYS")
    return True # PLEASE WORK SO I CAN NAP


""" the list of operations the file will run in
    1. register
    2. isregister
    3. buy 
    4. createPost
    5. getPost
    6. getclass

    Until they are functionally good then we'll separate them into separate
    files to make this code look nicer 

 """
def Main(operation, args):
    print("starting")
    if operation == "register":
        a = args[0]
        b = args[1]
        print("in op - register")
        register(b, a)
    elif operation == "isregister":
        a = args[0]
        b = args[1]
        print("in op - isRegister")
        isregister(b,a) 
    elif operation == "getclass": 
        a = args[0]
        b = args[1]
        print("in op - getClass") 
        c = args[2]
        d = args[3] 
        e = args[4]
        getclass(a, b, c, d, e)
    else:
        print("no op exist - ")
        print(operation) 
    print("done") 
