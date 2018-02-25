""" 
Creating a contract that will perform basic transaction in the neo
blockchain. 

Current abilities or transactions: 
1. register users 
2. check users 
3. check owner
4. self-destruct 

"""

from boa.blockchain.vm.Neo.Runtime import CheckWitness
from boa.blockchain.vm.Neo.Storage import GetContext, Put, Delete, Get
from boa.code.builtins import concat

""" is_owner
    This checks if the address of the wallet is the owner or not 
    it checks Get(GetContext, product_id) => 
        -> it checks the contract's context (whatever that means) with the product_id or the user's address
        -> Get => returns a value so as to speak
    CheckWitness(productOwner) => 
        -> verifies the person calling the contract has direct access and what not
"""

def is_owner(product_id): 
    print("Am I the product owner?")
    productOwner = Get(GetContext, product_id) 
    print("this is the productOwner value ", productOwner)
    isOwner = CheckWitness(productOwner)
    if not isOwner:
        print("Not the product Owner") 
    return isOwner

def isRegistered(userHash): 
    curObject = Get(GetContext, userHash) # should return the hardcoded class object here
    print(curObject) 
    return True

""" Main definition
    input: args[0] -> sender, 
           args[1] -> product_id, 
           args[2] -> <optional> another script hash
"""
def Main(operation, args):
    userHash = args[0] #who am i? 
    authorized = CheckWitness(userHash) 
    """if not authorized: 
        print("Get out cuz you're not authorized")
        
        # functions for owner and what not
    """
    # # testing here on the register and put(GetContext, userAddr) here 
    # # and making sure two things work before putting it in the blockchain
    productId = args[1]
    userInfo = list() 
    userInfo.append("David", "Addr123", 0) 
    Put(GetContext, userHash, UserInfo)

    if len(args) != 2: 
        print("Error on args")
        return False

    if operation != None: 
        if operation == 'register':
            print("register")
            isRegistered(userHash)
        elif operation == 'post':
            print("post")
        elif operation == 'registered':
            print("checking registered")
        elif operation == 'removepost': 
            print("remove posting")
        elif operation == 'getpost':
            print("getpost")
        else:
            print("nonsense")
