# alright this is the fucking file to get everything you fucking need in one go with docker 
# because i can't be asked to delete privnet all the time cuz im lazy 
# alright: run this chmod 777 tiredofthis.sh 
# ./tiredofthis.sh that's fucking it 

apt-get update 
apt-get install vim 

curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/testing.py -o testing.py
curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/compile.py -o compile.py
curl https://s3.amazonaws.com/neo-experiments/neo-privnet-old.wallet -o w1.wallet

### make sure to only curl this file and then run it and it'll do mostly everything for you tho no idea 

