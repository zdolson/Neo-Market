## THIS IS FOR THE NEWEST BOA-COMPILER HEADS UP
## INSTALLATION - GETTING STARTED
1. docker pull cityofzion/neo-privatenet <br /> 
    1. not metachris but cityofzion
2. git clone https://github.com/CityOfZion/neo-python.git 
    1. needs python3.6 to run 

## INFORMATION ABOUT THIS COMPILER AND HOW DAVID FIGURED THINGS OUT
1. https://www.youtube.com/watch?v=ZZXz261AXrM&t=785s 
    1. by local human
2. https://github.com/neo-project/neo/blob/master/neo/SmartContract/ContractParameterType.cs 
    1. information about the parameter and what to input 
3. https://github.com/CityOfZion/neo-python/blob/master/docs/source/neo/SmartContract/smartcontracts.rst 
    1. General information about this compiler and how to use smart contract 
4. https://github.com/CityOfZion/python-smart-contract-workshop 
    1. examples 
5. https://github.com/CityOfZion/neo-boa/tree/master/boa_test/example/demo
6. https://github.com/CityOfZion/neo-boa/blob/master/boa_test/example/demo/LargeArrayStorageTest.py
    1. how testing works

## HOW TO TEST testing.py - important
1. run docker with city of zion
    1. ``` sudo docker run --rm -d --name neo-privatenet -p 20333-20336:20333-20336/tcp -p 30333-30336:30333-30336/tcp cityofzion/neo-privatenet```
2. to get inside
    1. ```docker exec -it neo-privatenet /bin/bash```
3. curl this file 
    1. ```https://gitlab.com/zdolson/Neo-Market/raw/master/backend/Contracts/new-boa/neo_docker_setup.sh ```
    2. run it <br/> ```chmod u+x new_docker_setup.sh ; ./new_docker_setup.sh```
4. go into python3 prompt.py -p 
    1. p == privnet , m == mainnet 
5. open wallet here and rebuild it
    1. ```open wallet w1.wallet``` 
        1. pass: coz 
    2. rebuild and sync the wallet
        1. ```wallet rebuild```
    3. to show information 
        1. ```wallet```
    4. for more information in general
        1. ```wallet help```
6. to test things right away: 
```build testing.py test 0710 02 True False <function> <list>```
    1.  OPTIONAL: to see print statements <br/>
        ```config sc-events on```
7. to deploy contract: 
    1. ``` build testing.py ``` <br/>
    2. ```import contract testing.avm 0710 02 True False```<br/>
    3. ``` testinvoke <hash> <funcion> <list> ```<br/>
8. to manually test it - non-deployment here 
    1. ``` build testing.py test <function> <args> 0705 02 True False```