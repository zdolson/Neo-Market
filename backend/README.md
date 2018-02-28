## Prerequisites
1. Install Docker and pull PrivateNet repo (https://hub.docker.com/r/cityofzion/neo-privatenet/)
```
docker pull cityofzion/neo-privatenet
```
2. Install all dependencies using npm (@cityofzion/neon-js, axios)
```
cd /backend && npm install
```

## Setting up local neon-wallet-db and PrivateNet
1. Navigate to the local-neo folder, run docker-compose.yml
```bash
cd /local-neo && docker-compose up
```
2. In another terminal window, check if MongoDB, Redis server and PrivateNet are up and running.
```bash
curl http://127.0.0.1:5000/v2/network/nodes
```

### OPTIONAL MODIFICATION:
Edit your hosts file (google it if you don't know where it is) to take an alias for your local IP.
In this case, http://neo-privatenet is then understood to be http://127.0.0.1
```
127.0.0.1 neo-privatenet
```
This then allows us to execute the curl command as follows:
```bash
curl http://neo-privatenet:5000/v2/network/nodes
```

## Setting up local PrivateNet only
To start the PrivateNet
```bash
docker run --rm -d --name neo-privatenet -p 20333-20336:20333-20336/tcp -p 30333-30336:30333-30336/tcp cityofzion/neo-privatenet
```
The command above does as follows to the neo-privatenet container:
 * On stopping of the container, it will also be removed (```--rm```)
 * Run the container with the name neo-privatenet (```--name```)
 * Expose ports 20333-6 and 30333-6 on both the host and the container (```-p```)
 * Run the container in detached mode (```-d```)

To enter the shell of the PrivateNet container with shell access:
```bash
docker exec -it neo-privatenet /bin/bash
```

Neo-python and Contracts are in the neo-python directory
```bash
cd opt/neo-python/
```

## Contributors:
 * Colin Dunn
 * David Liang
 * Zachary Olson
