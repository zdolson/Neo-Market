from boa.blockchain.vm.Neo.Storage import GetContext, Get
from boa.code.builtins import list, concat


#User Class

class User():
    name = "a"
    useraddr = "a"
    register = False
    numPostings = 1
    posts = None


def init_User(name, useraddr, register, numPostings , postsLength) -> User:
    user = User()
    user.name = name
    user.useraddr = useraddr
    user.register = register
    user.numPostings = numPostings
    user.posts = list(length=postsLength)

    return user

