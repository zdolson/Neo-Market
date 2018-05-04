#### how to run it
# curl this file as raw from github then chmod777 it 
# ./start.sh 

apt-get update 
apt-get install vim # cuz i like vim 
apt-get install wget
apt-get install nano # for easier copying ability 

curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/new-boa/testing.py -o testing.py 
curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/new-boa/compile.py -o compile.py
curl https://s3.amazonaws.com/neo-experiments/neo-privnet.wallet -o w1.wallet
curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/new-boa/serialize.py -o serialize.py 