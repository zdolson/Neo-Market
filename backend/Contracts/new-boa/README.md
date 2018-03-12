##THIS IS FOR THE NEWEST BOA-COMPILER HEADS UP
##INSTALLATION
1. docker pull cityofzion/neo-privatenet <- not metachris but cityofzion
2. git clone https://github.com/CityOfZion/neo-python.git <-needs python3.6 to run 

##INFORMATION ABOUT THIS COMPILER AND HOW DAVID FIGURED THINGS OUT
1. https://www.youtube.com/watch?v=ZZXz261AXrM&t=785s <- by local human
2.https://github.com/neo-project/neo/blob/master/neo/SmartContract/ContractParameterType.cs 
    2.1. information about the parameter and what to input 
3. https://github.com/CityOfZion/neo-python/blob/master/docs/source/neo/SmartContract/smartcontracts.rst 
    3.1. General information about this compiler and how to use smart contract 
4. https://github.com/CityOfZion/python-smart-contract-workshop 
    4.1. examples 
5. https://github.com/CityOfZion/neo-boa/tree/master/boa_test/example/demo
6. https://github.com/CityOfZion/neo-boa/blob/master/boa_test/example/demo/LargeArrayStorageTest.py


##HOW TO TEST testing.py - important
1. run docker with city of zion 
2. once inside - copy: 
```https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/new-boa/start.sh```
3. chmod 777 start.sh and then ./start.sh 
4. go into python3 prompt.py -p 
5. open wallet w1.wallet pass: coz 
6. to test things right away: 
```build testing.py test 0710 01 True False <function> <list>```
    6.1. OPTIONAL: to see print statements
    ```config sc-events on```
7. to deploy contract: 
```build testing.py
import contract testing.avm 0710 01 True False
testinvoke <hash> <funcion> <list>```
