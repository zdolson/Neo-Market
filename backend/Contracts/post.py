from boa.blockchain.vm.Neo.Storage import GetContext, Get

""" this is the user class """ 
class Post():
    owner = "a" 
    title = "a" 
    desc = "a"
    price = 1
    amount = 1

def init_Post(owner, title, desc, price, amount) -> Post:

    # remember to "deserialized" it after you get everything working
    # until then keep using 10 for all integers

    post = Post()
    post.owner = owner 
    post.title = title 
    post.desc = desc 
    post.price = price 
    post.amount = amount

    return post