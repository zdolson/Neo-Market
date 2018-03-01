""" my god this is difficult """

from boa.blockchain.vm.Neo.Storage import GetContext, Put, Delete, Get
from post import init_Post

def register(name, addr): 
    a = Get(GetContext, name) 
    print("alright, here i am now in register") 
    if not a: 
        print("im not fucking there you fucking shit ass head") 
        Put(GetContext, name, addr)
    else: 
        print("who you fucking checking out ya fucker") 
    return True

def isregister(name, addr):
    a = Get(GetContext, name) 
    if not a:
        print("he doesn't fucking exist") 
        return True 
    else: 
        print("does exist you idiot ")
        return False

def buy(buyerAddr, sellerAddr): 
    pass

def createPost(owner, title, desc, price, amount): 
    pass 

def getPost(owner, title): 
    pass 

    
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

""" This is going to be so fucking barebone that it's bare """ 

# main fucking issue: I get list error what the flying fuck is it? 
# no idea: I believe im not calling (operation, args) right but i followed fucking dean shit head 
# so debugging all the way down
def Main(operation, args):
    print("does this fucking work first?")
    if operation == "register":
        a = args[0]
        b = args[1]
        print("you fucking what?")
        register(b, a) 
        print("after you fucking what?")
    elif operation == "isregister":
        a = args[0]
        b = args[1]
        print("why the fuck are you here, push when you get this down")
        isregister(b,a) 
    elif operation == "getclass": 
        a = args[0]
        b = args[1]
        print("getting this fucking class") 
        c = args[2]
        d = args[3] 
        e = args[4]
        getclass(a, b, c, d, e)
    else:
        print("fucking run shithead") 
    print("done") 
