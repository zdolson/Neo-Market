const neon = require('@cityofzion/neon-js')
const Neon = neon.default
const config = require('./config')
const axios = require("axios")
const util = require("./util.js")

var debug = false;


module.exports = {

    getBalance: (address) => {
        return neon.api.neoscan.getBalance(config.RESTEndpoint, address)
    },

    getRPCEndpoint: () => {
        return neon.api.neoscan.getRPCEndpoint(config.RESTEndpoint);
    },

    getBlockCount: () => {
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            const client = Neon.create.rpcClient(rpcEndpoint)
            // Returns block number
            return client.getBlockCount()
        })
    },

    queryRPC: (method, params, id = 1) => {
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            if (debug){
                console.log('queryRPC: (rpcEndpoint): ', rpcEndpoint);
                console.log('queryRPC: (method): ', method)
                console.log('queryRPC: (params): ', params)
            }

            const client = Neon.create.rpcClient(rpcEndpoint)
            let custQuery = Neon.create.query({
                method: method,
                params: params
            })
            return client.execute(custQuery).then(res => {
                if (debug){
                    console.log('queryRPC(): res: ', res)
                }
                return res
            }).catch(err => {
                if (debug){
                    console.log('queryRPC(): err: ', err)
                }
                return err
            })
        })
    },

    executeTransaction: (fromAccount, invoke, gasCost, intents = []) => {
        if (debug){
            console.log('blockchain.js: executeTransaction(): BEGINNING VARIABLES: ')
            console.log(fromAccount)
            console.log(invoke)
            console.log(gasCost)
            console.log(intents)
        }

        // Need to take passed in variables and assign to const variables, breaks otherwise for some reason.
        const newInvoke = invoke;
        const account = fromAccount;

        return neon.api.neoscan.getBalance(config.RESTEndpoint, account.address).then((balances) => {
            const scriptHash = config.scriptHash;
            neon.api.setApiSwitch(0);
            const invokeConfig = {
                net: config.RESTEndpoint,
                script: Neon.create.script(newInvoke),
                address: account.address,
                privateKey: account.privateKey,
                balance: balances,
                intents: intents,
                gas: 1
            }
            Neon.doInvoke(invokeConfig).then(res => {
                if (debug){
                    console.log(res);
                }
                return res;
            })
        }).catch(function (error) {
            if (debug){
                console.log(error);
            }
        })
    },

    getScriptHash: (input) => {
        const hash = neon.wallet.getScriptHashFromAddress(input);
        return util.reverseHex(hash);
    },

    getStorage: (key) => {
        if (debug){
            console.log('getStorage: key:', key);
        }
        if (neon.wallet.isAddress(key)) {
            key = module.exports.getScriptHash(key);
        } else {
            key = util.str2hex(key);
        }
        return module.exports.queryRPC(
            'getstorage',
            [config.scriptHash, key]
        ).then(function (res) {
            return util.hex2str(res.result);
        })
    },

    testContract: (operation, args, callback) => {
        let hexArgs = util.arr2hex(args);
        const props = {
            scriptHash: config.scriptHash,
            operation: operation,
            args: hexArgs
        }
        // console.log('blockchain.js: testContract(): vmScript: ')
        // Returns vmScript as a hexstring
        const vmScript = Neon.create.script(props)
        // console.log(vmScript)
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            return neon.rpc.Query.invokeScript(vmScript)
                .execute(rpcEndpoint)
                .then((res) => {
                    callback(res);
                    if (debug){
                        console.log('testContract(): result: ');
                        console.log(res);
                    }
                })
        })
    },

    invokeContract: (operation, args, account, callback) => {
        //Convert args to hex format
        let hexArgs = [];
        args.forEach(function (arg) {
            hexArgs.push(util.str2hex(arg));
        })
        const scriptHash = config.scriptHash;
        const invoke = {
            operation: operation,
            args: hexArgs,
            scriptHash: scriptHash
        };

        // intents are required to make a transaction run on the blockchain, no assets = no execution
        const intents = [{
            assetId: neon.CONST.ASSET_ID.GAS,
            value: 0.00000001,
            scriptHash: Neon.get.scriptHashFromAddress(account.address)
        }];
        const gasCost = 1;
        const props = {
            scriptHash: scriptHash,
            operation: operation,
            args: hexArgs
        };

        // Returns vmScript as a hexstring
        const vmScript = Neon.create.script(props);
        if (debug){
            console.log('invokeContract(): vmScript: ');
            console.log(vmScript);
        }

        //Test the transaction, if success then send to execute.
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            return neon.rpc.Query.invokeScript(vmScript)
                .execute(rpcEndpoint)
                .then((res) => {
                    if (debug){
                        console.log('invokeContract(): invokeScript(): res: ')
                        console.dir(res)
                    }
                    if (res.result.state === 'HALT, BREAK') {
                        if (debug){
                            console.log('invokeContract(): HALT, BREAK: ')
                            // console.log('invokeContract(): vars(account, invoke, gasCost, intents) ')
                            // console.log(account)
                            // console.log(invoke)
                            // console.log(gasCost)
                            // console.log(intents)
                        }
                        //Execute the transaction
                        module.exports.executeTransaction(account, invoke, gasCost, intents).then(res => {
                            if (res !== undefined)
                                callback(res)
                            else
                                return
                        })
                    } else {
                        if (debug){
                            console.log('invokeContract(): err:', res)
                        }
                    }
                })
        })
    }
}
