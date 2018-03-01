""" my god this is difficult """

from boa.blockchain.vm.Neo.Storage import GetContext, Put, Delete, Get


def register(name, addr): 
    a = Get(GetContext, name) 
    print("alright, here i am now in register") 
    if not a: 
        print("im not fucking there you fucking shit ass head") 
    else: 
        print("who you fucking checking out ya fucker") 
    return True

def isdone(name, addr):
    a = Get(GetContext, name) 
    if not a:
        print("he doesn't fucking exist") 
        return True 
    else: 
        print("does exist you idiot ")
        return False

""" This is going to be so fucking barebone that it's bare """ 

# main fucking issue: I get list error what the flying fuck is it? 
# no idea: I believe im not calling (operation, args) right but i followed fucking dean shit head 
# so debugging all the way down
def Main(operation, args):
    print("does this fucking work first?")
    a = args[0]
    b = args[1]
    print("i fucking got it please")
    print(a, b)  
    if operation == "register":
        print("you fucking what?")
        register(b, a) 
        print("after you fucking what?")
    elif operation == "isdone":
        print("why the fuck are you here, push when you get this down")
    else:
        print("fucking run shithead") 
    print("done") 
