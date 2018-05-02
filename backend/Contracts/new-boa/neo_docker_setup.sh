## this is to set up docker with test cases everything someone wants to make sure it all works
## the only issue I can think of using this is that someone would have to manually go into prompt.py 
## and test the cases themselves. => I guess I'll go do that in a bit to make sure it all works

#TODO:  1. learn how to run neo-python testcases or functionalities 
#       2. make sure the entrypoint of docker works fine or give the command to call out and encrypt the script file x 
#       3. set up  gitlab for curl and stuff  x 
#       4. set up the file with u+x permission or check if the user has done so before running this.

# should work for docker 7.24 and not 7.25 for right now (still updating that in neo-boa)
apt-get update # updating docker images here

# grabbing wallet as w1.wallet 
curl https://s3.amazonaws.com/neo-experiments/neo-privnet.wallet -o w1.wallet 

# time to get all of the test cases from gitlab - TODO
# grabbing all supposed files from gitlab -> UsQx-_vq6wNnx4CVAoi_ (access code to gitlab, bad habit but I don't see any other way to automate this)

# testing if the files grabbed are wrong please sign in and what not if I curl it without an access token 
# if I see one instance of the word "html" it messed up or I messed up
curl --request GET --header "PRIVATE-TOKEN: UsQx-_vq6wNnx4CVAoi_" "https://gitlab.com/zdolson/Neo-Market/raw/master/new-boa/serialize.py" -o serialize.py
curl --request GET --header "PRIVATE-TOKEN: UsQx-_vq6wNnx4CVAoi_" "https://gitlab.com/zdolson/Neo-Market/raw/master/new-boa/testing.py" -o testing.py
