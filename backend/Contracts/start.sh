### how to run this 
# curl this file 
# chmod 777 start.sh 
# ./start.sh 



apt-get update 
apt-get install vim 
apt-get install wget

# curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/testing.py -o testing.py
# curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/compile.py -o compile.py
# curl https://s3.amazonaws.com/neo-experiments/neo-privnet-old.wallet -o w1.wallet
# curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/post.py -o post.py
# curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/serialize.py -o serialize.py 
### make sure to only curl this file and then run it and it'll do mostly everything for you tho no idea 

curl https://raw.githubusercontent.com/zdolson/Neo-Market/david_develop/backend/Contracts/testing.py -o testing.py
curl https://raw.githubusercontent.com/zdolson/Neo-Market/david_develop/backend/Contracts/serialize.py -o serialize.py 
curl https://raw.githubusercontent.com/zdolson/Neo-Market/david_develop/backend/Contracts/post.py -o post.py 
curl https://raw.githubusercontent.com/zdolson/Neo-Market/david_develop/backend/Contracts/compile.py -o compile.py 
curl https://raw.githubusercontent.com/zdolson/Neo-Market/david_develop/backend/Contracts/User.py -o User.py 


echo "remember to import serialize to testing.py if you're testing with it"
python3 compile.py testing.py 
