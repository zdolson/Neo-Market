const neon = require('@cityofzion/neon-js')
// import neon from '@cityofzion/neon-js'
const Neon = neon.default
const config = require('./config')
const axios = require("axios")
const util = require("./util.js")
const sb = Neon.create.scriptBuilder()


module.exports = {

    getBalance: (address) => {
        // return axios.get(config.RESTEndpoint + '/v2/address/balance/' + address)
        //     .then((res) => {
        //         return res.data
        //     })
        let account = new neon.wallet.Account(config.wif)
        return neon.api.neonDB.getBalance(config.RESTEndpoint, account.address)
    },

    getRPCEndpoint: () => {
        return axios.get(config.RESTEndpoint + '/v2/network/best_node').then(function (response) {
            console.log('blockchain.js: getRPCEndpoint(): result:', response.data.node)
            return response.data.node
        })
    },

    queryRPC: (method, params, id = 1) => {
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            return neon.rpc.queryRPC(rpcEndpoint, {
                method: method,
                params: params,
                id: id
            }).then(res => {
                console.log('blockchain.js: queryRPC(): res:')
                console.log(res)
                return res
            }).catch(err => {
                console.log('blockchain.js: queryRPC(): err:')
                console.log(err)
                return err
            })
        })
    },

    executeTransaction: (fromAccount, invoke, gasCost, intents = []) => {
        console.log('blockchain.js: executeTransaction(): BEGINNING VARIABLES: ')
        console.log(fromAccount)
        console.log(invoke)
        console.log(gasCost)
        console.log(intents)
        // let newAccount = new neon.wallet.Account(config.wif);
        // let net = 'http://neo-privatenet:5000/'
        // neon.api.neonDB.getBalance(net, account.address)
        //const account = Neon.create.account(config.wif)
        return neon.api.neonDB.getBalance(config.RESTEndpoint, fromAccount.address).then((balances) => {
            console.log('blockchain.js: executeTransaction(): return: ')
            console.log('blockchain.js: executeTransaction(): return: balances: ')
            console.log(balances)
            // console.log(typeof (invoke))
            console.log(invoke)
            // const newScript = Neon.create.script(invoke)
            const unsignedTx = neon.tx.Transaction.createInvocationTx(balances, intents, invoke, gasCost, {})
            const signedTx = neon.tx.signTransaction(unsignedTx, fromAccount.privateKey)
            const hexTx = neon.tx.serializeTransaction(signedTx)
            console.log('blockchain.js: executeTransaction(): return: unsignedTx: ')
            console.log(unsignedTx)
            console.log('blockchain.js: executeTransaction(): return: signedTx: ')
            console.log(signedTx)
            console.log('blockchain.js: executeTransaction(): return: hexTx: ')
            console.log(hexTx)
            return module.exports.queryRPC(
                'sendrawtransaction',
                [hexTx]
            ).then(function (res) {
                return res
            })
        }).catch(function (error) {
            console.log(error)
        })
    },

    getScriptHash: (input) => {
        const hash = neon.wallet.getScriptHashFromAddress(input)
        return util.reverseHex(hash)
    },

    getStorage: (key) => {
        console.log(key)
        if (neon.wallet.isAddress(key)) {
            key = module.exports.getScriptHash(key)
        } else {
            key = util.str2hex(key)
        }
        return module.exports.queryRPC(
            'getstorage',
            [config.scriptHash, key]
        ).then(function (res) {
            return util.hex2str(res.result)
        })
    },

    testContract: (operation, args, callback) => {
        let hexArgs = util.arr2hex(args)
        const props = {
            scriptHash: config.scriptHash,
            operation: operation,
            args: hexArgs
        }
        console.log('blockchain.js: testContract(): vmScript: ')
        // Returns vmScript as a hexstring
        const vmScript = Neon.create.script(props)
        console.log(vmScript)
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            return neon.rpc.Query.invokeScript(vmScript)
                .execute(rpcEndpoint)
                .then((res) => {
                    callback(res)
                    console.log('blockchain.js: testContract(): result: ')
                    console.log(res)
                    console.log('blockchain.js: testContract(): END. ')
                })
        })
    },

    invokeContract: (operation, args, account, callback) => {
        //Convert args to hex format
        let hexArgs = []
        args.forEach(function (arg) {
            hexArgs.push(util.str2hex(arg))
        })
        const scriptHash = config.scriptHash
        const invoke = {operation: operation, args: hexArgs, scriptHash: scriptHash}
        const intents = [
            //   {assetId: util.ASSETS['GAS'], value: 0.00000001, scriptHash: scriptHash}
        ]
        const gasCost = 1
        const props = {
            scriptHash: scriptHash,
            operation: operation,
            args: hexArgs,
        }
        console.log('blockchain.js: invokeContract(): vmScript: ')
        // Returns vmScript as a hexstring
        const vmScript = Neon.create.script(props)
        console.log(vmScript)

        // sb.emitAppCall(config.scriptHash,operation,hexArgs)
        // console.log(sb.str)


        //Test the transaction
        return module.exports.getRPCEndpoint().then(rpcEndpoint => {
            return neon.rpc.Query.invokeScript(vmScript)
                .execute(rpcEndpoint)
                .then((res) => {
                    console.log('blockchain.js: invokeContract(): invokeScript() result: ')
                    console.dir(res)
                    if (res.result.state === 'HALT, BREAK') {
                        console.log('blockchain.js: invokeContract(): HALT, BREAK: ')
                        console.log('blockchain.js: invokeContract(): vars(account, invoke, gasCost, intents) ')
                        console.log(account)
                        console.log(invoke)
                        console.log(gasCost)
                        console.log(intents)
                        //Execute the transaction
                        module.exports.executeTransaction(account, invoke, gasCost, intents).then(res => {
                            if (res !== undefined)
                                callback(res)
                            else
                                return
                        })
                    } else {
                        console.log('Error:', res)
                    }
                })
        })
    }
}
