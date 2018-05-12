## Disclaimer:
 * The following instructions have only been tested on MacOS. They should work right off or with minor tweaks for Linux.
 * If you are switching from the older version that used neon-wallet-db, please run the commands associated with
   issues 1 and 2 down in Known Issues.


## Prerequisites
1. Docker
2. Install all backend dependencies using npm (@cityofzion/neon-js, axios)
```bash
cd /backend && npm install
```
3. Install all frontend dependencies using npm
```bash
cd /WebApp && npm install
```

## Setting up local neo-scan and PrivateNet
1. Navigate to the local-neo folder, run docker-compose.yml and docker-compose-neoscan.yml
```bash
cd /local-neo && docker-compose -f docker-compose-neoscan.yml up
```
Fair warning, this step will likely take awhile as the new PrivateNet continues on block ~20k,
and neo-scan will need to load every block on it's first startup. So maybe watch something for
5 minutes or so.
2. Open a web browser tab and proceed to the following URL. If accessible, Neo-scan is up and running.
```URL
http://localhost:4000/
```
3. Required modification to hosts file (google if unsure where it is located on your computer).
```bash
127.0.0.1 neo-privnet
```

### OPTIONAL MODIFICATION:
Edit your hosts file (google it if you don't know where it is) to take an alias for your local IP.
In this case, http://neo-privatenet is then understood to be http://127.0.0.1
```
127.0.0.1 neo-privatenet
```

## Setting up local PrivateNet only (Unnecessary, but more info)
To start the PrivateNet
```bash
docker run --rm -d --name neo-privnet -p 20333-20336:20333-20336/tcp -p 30333-30336:30333-30336/tcp cityofzion/neo-privnet
```
The command above does as follows to the neo-privatenet container:
 * On stopping of the container, it will also be removed (```--rm```)
 * Run the container with the name neo-privatenet (```--name```)
 * Expose ports 20333-6 and 30333-6 on both the host and the container (```-p```)
 * Run the container in detached mode (```-d```)

To enter the shell of the PrivateNet container with shell access:
```bash
docker exec -it neo-privnet /bin/bash
```
As of the new CLI version release (2.7.3), you will spawn inside of the neo-python directory automatically.
You have several commands available for you to start prompt.py:
 * ```neopy``` Recommended since it is easy to remember.
 * ```np-prompt```
 * ```python3 prompt.py``` Note, this will default to TestNet. Use the flag -p for PrivateNet, -m for MainNet.

## Deploying testing.py Smart Contract on our PrivateNet
1. Set up both Neo-scan and the PrivateNet with the instructions above. Enter PrivateNet shell with:
```bash
docker exec -it neo-privnet /bin/bash
```

2. Curl our script start.sh, enable and run.
```bash
curl https://raw.githubusercontent.com/zdolson/Neo-Market/master/backend/Contracts/new-boa/neo_docker_setup.sh -o neo_docker_setup.py
&& chmod u+x neo_docker_setup.sh
&& ./neo_docker_setup.sh
```
This will update any modules inside of the PrivateNet, download a wallet with 100M NEO and ~160k GAS, as well as
download the current version of Smart Contract testing.py from our repo.

3. Enter prompt.py with either of the three available commands above. (since they change the location a few times now)
```
  a=find -name 'prompt.py' ; python3 $a  
```

4. Open the wallet for use of assets.
```neo-cli
open wallet w1.wallet
```
The password for w1.wallet is **coz**
Rebuild the wallet. This is required on first-time loading of the wallet in a newly created PrivateNet
```neo-cli
wallet rebuild
```
5. Enable Smart Contract events
```neo-cli
config sc-events on
```
6. Compile (and optionally test functions) the Smart Contract testing.py
```neo-cli
build testing.py
```
Optionally you can test certain functions here with the same build command.
```neo-cli
build testing.py test 0710 01 True False register ['waldo','15']
```
Here is a breakdown of the ```build``` command's arguments above:
 * 1st Argument: ```testing.py``` is the Python Smart Contract that we are using.
 * 2nd Argument: ```test``` is required for the build command to execute as a function test.
 * 3rd Argument: this is a string of two digit arguments, each two representing an argument type for the
   Smart Contract. This will vary among Smart Contracts, however the standard practice is to only accept
   a String ```07``` and an Array ```10```  which usually houses the other variables). The first argument
   is generally reserved for the Smart Contract's operation.
 * 4th Argument: this is the return type, there is only ever one return value. In this case, we return ```01```
   which indicates that our Smart Contract functions all return a Boolean.
 * 5th Argument: Accepts a Boolean, indicates whether the Smart Contract is using Storage or not.
 * 6th Argument: Accepts a Boolean, indicates whether the Smart Contract is using Dynamic Invoke or not.
 * 7th Argument: ```register``` is one of testing.py's functions, the one that we are testing.
 * 8th Argument: Array of arguments that are to be supplied to our Smart Contract's function. Comma separated,
   all arguments are required to be of type String. In this case, we are registering User Waldo with Address 15.

If the output from testing the functions is satisfactory, rebuild the Smart Contract without testing arguments
and proceed.
7. Deploy Smart Contract
```neo-cli
import testing.avm 0710 02 True False
```
Breakdown of ```import``` command's arguments:
 * 1st Argument: ```testing.avm``` is the compiled result from ```build testing.py```.
 * 2nd Argument: Again, these are the input argument types, in order, represented as two digits.
 * 3rd Argument: Again, this is the output value type, represented as two digits.
 * 4th Argument: Again, this is the Boolean for if the Smart Contract uses Storage.
 * 5th Argument: Again, this is the Boolean for if the Smart Contract uses Dynamic Invoke.

After executing the above command, the CLI will ask you to provide some Metadata for the Smart Contract.
Feel free to name the Smart Contract whatever you so choose, you can use it later to look up this deployed
Smart Contract and its information (ScriptHash being the main required information).
You may also just press enter to skip the other fields as they do not matter so much in our own PrivateNet.
Once through filling out Metadata, it will prompt you to import wallet password to approve use of assets.
Enter the password displayed above and wait ~2 blocks (roughly 8 seconds/block) before you should see Runtime
events pop up inside of prompt.py displaying that the Smart Contract has been deployed.
8. Search deployed Smart Contracts
To search for an already deployed Smart Contract, simply enter the following command with the Smart Contract's name
as an argument.
```neo-cli
contract search deployedSmartContractNameGoesHere
```
You will very likely use this to retrieve the deployed Smart Contract's ScriptHash if you missed recording it
earlier in the wall of text that comes after deploying the Smart Contract. Simply locate the ScriptHash field
and record the value.

## Known issues that may occur in most of these steps:
1. Issues with starting any image in docker.
 * Try stopping and then removing all docker containers. Note, this will restart any progress inside of those
   containers.
   ```bash
   docker stop $(docker ps -aq)
   && docker rm $(docker ps -aq)
   ```
2. If you are converting over from the previous version that used neon-wallet-db, you need to remove all images.
 * Run the following commands to full remove all containers and the images. You need to start fresh for neo-scan to
   not encounter any funky issues. Run the above commands first and then the command below.
   ```bash
   docker rmi $(docker images)
   ```

## Contributors:
 * Colin Dunn
 * David Liang
 * Zachary Olson
