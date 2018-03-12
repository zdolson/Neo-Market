from boa.blockchain.vm.Neo.Storage import GetContext, Put, Delete, Get
from boa.code.builtins import list, concat 
from serialize import serialize_array, serialize_var_length_item, deserialize_bytearray


def register(args): 
    b = Get(GetContext, b'1')
    people = deserialize_bytearray(b) 
    for i in args: 
        people.append(i) 
    
    a = serialize_array(people) 
    Put(GetContext, b'1', a) 

def Main(operation, args): 
    People = list() 
    people = serialize_array(People) 
    a = Put(GetContext, b'1', people) 
    if operation == "register": 
        register(args) 
    else: 
        print("no functions") 