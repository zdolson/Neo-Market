from boa.blockchain.vm.Neo.Storage import GetContext, Put, Delete, Get
from post import init_Post
from serialize import serialize_array, serialize_var_length_item, deserialize_bytearray
from boa.code.builtins import list, concat

def fillMaster(name):
    masterbList = Get(GetContext, '1')
    masterList = deserialize_bytearray(masterbList)
    masterList.append(name)
    masterList.append(",")
    masterbList = serialize_array(masterList)
    Put(GetContext, '1', masterbList)
    print("done with master") 
    print(name) 
    print("master length: ") 
    a = len(masterList) 
    print(a) 

# this registers a user to their addr in the ocntract
# then it registers their address to a list of list 
def register(name, addr): 
    check = name 
    if check == '1':
        print("no")
        return False 
    else:
        isMasterThere = Get(GetContext, '1') 
        if not isMasterThere:
            masterList = serialize_array([])
            Put(GetContext, '1', masterList) 

    a = Get(GetContext, name) 
    print("checking if user exist") 
    if not a: 
        print("user does not exist - registering")
        lists = list()
        bLists = serialize_array(lists)
        Put(GetContext, name, addr)
        Put(GetContext, addr, bLists) 
        print("finish registering")
        fillMaster(name) 
    else: 
        print("user already exist")
        return False 
    return True

# this checks if the user is registered or not
def isRegister(name, addr):
    a = Get(GetContext, name) 
    if not a:
        print("there is no user in contract") 
        return False
    else: 
        print("user is in contract")
        return True

# this uses the buyer's address to purchase the address of the seller 
# perhaps the item of the seller and the amount of it
# not sure if the implementation of Neo coins to other addresses is possible so 
# for right now ill return the address of the user and allow the integration 
# of the wallet from neon-js on the other hand
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
# Add ID as a 6th param, BACKLOG
def createPost(index, owner, title, desc, price, amount):
    a = Get(GetContext, owner)
    if a:
        bList = Get(GetContext, a) 
        stuff = deserialize_bytearray(bList)
        
        stuff.append(index) 
        stuff.append(",")
        stuff.append(owner)
        stuff.append(",")
        stuff.append(title)
        stuff.append(",")
        stuff.append(desc)
        stuff.append(",")
        stuff.append(price)
        stuff.append(",")
        stuff.append(amount)
        stuff.append(";")

        # strings = index+","+owner+","+title+","+desc+","+price+","+amount
        #bList = Get(GetContext,a)
        #stuff = deserialize_bytearray(bList)
        #stuff.append(strings)    
        bList = serialize_array(stuff)
        Put(GetContext, a, bList)

        return True
    else:
        print("failed")
        return False

# this is a getter for createPost and gets the selected list and returns it 
# more descriptions to come *backlog*
# title = index 
def getPost(owner, title): 
    pubAddress = Get(GetContext, owner)
    postInfo = Get(GetContext, pubAddress)
    print("Public Address: " , pubAddress)
    print("Post info: " , postInfo)
    
    dpostInfo = deserialize_bytearray(postInfo)
    print("check stuff")
    c = dpostInfo[title]
    owner = c[0] 
    title = c[1]
    desc = c[2] 
    price = c[3] 
    amount = c[4] 
    print(owner) 
    print(title)
    print(desc)
    print(price)
    print(amount)
    return True

def deletePost(owner,postindex):
    #postindex is in backlog
    addr = Get(GetContext, owner) 
    bList = Get(GetContext, addr) 
    stuff = deserialize_bytearray(bList) 
    len_stuff = len(stuff) 
    if len_stuff != 0: 
        stuff[postindex] = "0" 
    bList = serialize_array(stuff) 
    Put(GetContext, addr, bList) 

# this is to check if it was possible to build a class in neo-python and 
# return true if it does, that's it 
def getClass(owner, title, desc, price, amount):
    post = init_Post(owner, title, desc, price, amount)
    print("this is the owner") 
    print(post.owner)
    print("im selling this shit") 
    print(post.title, post.desc)
    print("for this much : ") 
    print(post.price, post.amount)
    print("GOING TO SLEEP BOYS")
    return True # PLEASE WORK SO I CAN NAP

# this adds item to the cart the user would want to buy from
def addItems(items):
    pass

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
        isRegister(b,a) 
    elif operation == "getclass": 
        a = args[0]
        b = args[1]
        print("in op - getClass") 
        c = args[2]
        d = args[3] 
        e = args[4]
        getClass(a, b, c, d, e)
    elif operation == "createpost":
        index1 = args[0]
        owner = args[1]
        title = args[2]
        desc = args[3]
        price = args[4]
        amount = args[5]
        createPost(index1, owner, title, desc, price, amount)
    elif operation == 'getpost':
        owner = args[0]
        title = args[1]
        getPost(owner,title)
    elif operation == 'deletepost':
        owner = args[0]
        postIndex = args[1]
        deletePost(owner,postIndex)
    else:
        print("no op exist - ")
        print(operation) 
    print("done") 
