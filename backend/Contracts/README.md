## To test smart contracts in docker and the privnet in general 
1. Follow the Prerequisites from the previous page from the README on backend
2. Once docker is installed, use this command: 
```docker run --rm -d --name neo-privatenet -p 20333-20336:20333-20336/tcp -p 30333-30336:30333-30336/tcp cityofzion/neo-privatenet ```
3. go inside the selected docker container: 
```docker exec -it neo-privatenet /bin/bash ```
4. go into opt/neo-python 
5. download the start.sh script file to get started 
```bash https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/start.sh```

## Activating and rebuilding wallet
1. open wallet and rebuild it 
```python3 prompt.py -p```
```open wallet w1.wallet``` 
2. the password is "coz" 
3. rebuild the wallet 
```wallet rebuild```
4. to check the content of the wallet, type: wallet 

## To deploy contract 
1. Find the file you would like to deploy 
2. compile the file into avm
```python3 compile.py <filename>.py``` 
3. go back into the virtual machine with prompt.py 
4. inside, use this command 
```import contract <filename>.avm 0710 05 True False```
(NOTE: I will get back to this on defining what these cases are)
5. Wait a few second to a few minutes until it says transaction is done
6. once done, get the hash from the eventlog or with this command: 
```contract search <contract_name> ```
7. Test whatever function you like or the contract in general
```testinvoke hash_addresss function [args]```
(NOTE: contracts could have no input values)