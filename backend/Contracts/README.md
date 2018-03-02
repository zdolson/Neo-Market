this is a quick README guide on how to run the contract if you want to 

1. install docker 
2.there really isn't a need to install neo-python but you should anyways 
    2.1 https://github.com/CityOfZion/neo-python/
3. download docker and pull https://hub.docker.com/r/metachris/neo-privnet-with-gas/
4. then docker run the file, the command is inside the link
5. run: docker exec -it neo-privatenet /bin/bash 
6. go to opt/neo-python 
7. curl https://github.com/zdolson/Neo-Market/blob/master/backend/Contracts/start.sh -o start.sh 
8. chmod 777 start.sh then ./start.sh 
    8.1 this will give you all the files required to play around with our current smart contract 
9. go to prompt.py -p using this: python3 prompt.py -p 
10. open wallet w1.wallet and wallet rebuild to get your funding and wait a bit for the blockchain to finsh
11. python3 compile.py testing.py 
12. go back to prompt.py, "import contract testing.avm 0710 05 True False" 
13. contract search {contract_name} and copy the hash
14. testinvoke <hash_number> <op_call> [args] 
15. wait a bit and you'll see the real-time event log and you're set.
