const neon = require('@cityofzion/neon-js')
const Neon = neon.default
const config = require('./configFiles/config')
const node = require('./configFiles/blockchain')
const axios = require("axios")
const account = Neon.create.account(config.wif)

const masterList = '1';
var debug = false;


/**

@Zachary Olson

@3/10/2018

@Purpose: Created wrapper functions for most of the smart contract functions.

**/


module.exports = {

    /*
     * @Function: getBlockCount
     * @Contributor: Zachary Olson
     * @Return: {string} blockHeight
     * Purpose: Returns the current block height.
     */
    getBlockCount: () => {
        return new Promise((resolve,reject) => {
            node.getBlockCount().then(blockHeight => {
                if (debug){
                    console.log('getBlockCount(): blockHeight: ', blockHeight);
                }
                resolve(blockHeight);
            }).catch(err => {
                if (debug){
                    console.error('getBlockCount(): err: ', err);
                }
                reject(err);
            })
        })
    },

    /*
     * @Function: getContractState
     * @Contributor: Zachary Olson
     * @Return: {string array} state
     * Purpose: Returns an array of strings, providing information regarding the contract's state.
     */
    getContractState: () => {
        return new Promise((resolve,reject) => {
            node.getRPCEndpoint().then(rpcEndpoint => {
                let client = Neon.create.rpcClient(rpcEndpoint);
                client.getContractState(config.scriptHash).then(state => {
                    if (debug){
                        console.log('getContractState(): state: ', state);
                    }
                    resolve(state);
                }).catch(err => {
                    if (debug){
                        console.log('getContractState(): err: ', err);
                    }
                    reject(err);
                })
            }).catch(err => {
                if (debug){
                    console.log('getContractState(): err: ', err);
                }
                reject(err);
            })
        })
    },

    /*
     * @Function: getAddressFromUser
     * @Contributor: Zachary Olson
     * @Param: {string} name
     * @Return: {string} address
     * Purpose: Returns the String, address, under a username on the SC.
     */
    getAddressFromUser: (name) => {
        return new Promise((resolve,reject) => {
            node.getStorage(name).then(address => {
                if (debug){
                    console.log('getAddressFromUser(): address: ', address);
                }
                resolve(address);
            }).catch(err => {
                if (debug){
                    console.error('getAddressFromUser(): err: ', err);
                }
                reject(err);
            })
        })
    },

    /*
     * @Function: getUserPostsFromStorage
     * @Contributor: Zachary Olson
     * @Param: {string} name
     * @Return: {string array} posts
     * Purpose: Returns array of strings, each index is a separate post under the passed username.
     */
    getUserPostsFromStorage: (name) => {
        return new Promise((resolve,reject) => {
            module.exports.getAddressFromUser(name).then(address => {
                node.getStorage(address).then(res => {
                    let posts = res.split(';');
                    if (debug){
                        console.log('getUserPostsFromStorage(): posts: ', posts);
                    }
                    resolve(posts);
                }).catch(err => {
                    if (debug){
                        console.error('getUserPostsFromStorage(): err: ', err);
                    }
                    reject(err);
                })
            }).catch(err => {
                if (debug){
                    console.error('getUserPostsFromStorage(): err: ', err);
                }
                reject(err);
            })
        })
    },

    /*
     * @Function: getAllUsersFromStorage
     * @Contributor: Zachary Olson
     * @Return: {string array} users
     * Purpose: Returns a string array of all users registered on the SC.
     */
    getAllUsersFromStorage: () => {
        return new Promise((resolve, reject) => {
            node.getStorage(masterList).then(res => {
                let users = res.replace(/[^\x20-\x7E]/g, '');
                users = users.split(',');
                if (debug){
                    console.log('getAllUsersFromStorage(): users: ', users);
                }
                resolve(users);
            }).catch(err => {
                if (debug){
                    console.error('getAllUsersFromStorage(): err: ', err);
                }
                reject(err);
            })
        })
    },

    /*
     * @Function: getAllPostsFromStorage
     * @Contributor: Zachary Olson
     * @Return: {string array} allPosts
     * Purpose: Returns a string array of all postings stored on the SC.
     */
    getAllPostsFromStorage: () => {
        return new Promise((resolve,reject) => {
            var allPosts = [];
            module.exports.getAllUsersFromStorage().then(userList => {
                for (var i = 0; i < userList.length-1; i++) {
                    module.exports.getUserPostsFromStorage(userList[i]).then((posts) => {
                        allPosts.push(posts);
                        if(i == userList.length - 1) {
                            if (debug){
                                console.log('getAllPostsFromStorage(): allPosts: ', allPosts);
                            }
                            resolve(allPosts);
                        }
                    }).catch(err => {
                        if (debug){
                            console.error('getAllPostsFromStorage(): err: ', err);
                        }
                        reject(err);
                    })
                }
            }).catch(err => {
                if (debug){
                    console.error('getAllPostsFromStorage(): err: ', err);
                }
                reject(err);
            })
        })
    },


    /*
     * @Function: register
     * @Contributor: Zachary Olson
     * @Param: {string} address
     * @Param: {string} name
     * @Return: Nothing
     * Purpose: Register a new user on the smart contract.
     *          Calls invokeContract() with register function to smart contract.
     */
    register: (name, address) => {
        node.invokeContract('register', [name, address], account, (res) => {
            if (debug){
                console.log('register(): res: ');
                console.dir(res);
            }
            if (res.result === true) {
                if (debug){
                    console.log('register(): Transaction successful.')
                }
                // return true;
                //can do other things if successful, like transition pages, etc.
            } else {
                if (debug){
                    console.log('register(): Transaction failed.')
                }
                // return false;
                //can do other things if failed, like scream at user.
            }
        })
    },

    /*
     * @Function: isRegister
     * @Contributor: Zachary Olson
     * @Param: {string} address
     * @Param: {string} name
     * @Return: Nothing
     * Purpose: Checks if user is already registered on smart contract.
     *          Calls invokeContract() with isregister function to smart contract.
     */
    isRegister: (name, address) => {
        node.invokeContract('isregister', [name, address], account, (res) => {
            if (debug){
                console.log('isRegister(): res: ');
                console.dir(res);
            }
            if (res.result === true) {
                if (debug){
                    console.log('isRegister(): Transaction successful.')
                }
                //can do other things if successful, like transition pages, etc.
            } else {
                if (debug){
                    console.log('isRegister(): Transaction failed.')
                }
                //can do other things if failed, like scream at user.
            }
        })
    },

    /*
     * @Function: createPost
     * @Contributor: Zachary Olson
     * @Param: {string} id
     * @Param: {string} owner
     * @Param: {string} title
     * @Param: {string} desc
     * @Param: {string} price
     * @Param: {string} amount
     * @Return: Nothing
     * Purpose: Creates a Post on the smart contract.
     *          Calls invokeContract() with createpost function to smart contract.
     */
    createPost: (id, owner, title, desc, price, amount) => {
        node.invokeContract('createpost', [id,owner,title,desc,price,amount], account, (res) => {
            if (debug){
                console.log('createPost(): res: ');
                console.dir(res);
            }
            if (res.result === true) {
                if (debug){
                    console.log('createPost(): Transaction successful.')
                }
                //can do other things if successful, like transition pages, etc.
            } else {
                if (debug){
                    console.log('createPost(): Transaction failed.')
                }
                //can do other things if failed, like scream at user.
            }
        })
    },

    // NOT YET IMPLEMENTED! -in the works 4/9
    /*
     * @Function: deletePost
     * @Contributor: Zachary Olson
     * @Param: {string} owner
     * @Param: {string} index
     * @Return: Nothing
     * Purpose: Deletes a Post under a user's storage with the given index on the smart contract.
     *          Calls invokeContract() with deletepost function to smart contract.
     */
    deletePost: (owner, index) => {
        node.invokeContract('deletepost', [owner,index], account, (res) => {
            if (debug){
                console.log('deletePost(): res: ');
                console.dir(res);
            }
            if (res.result === true) {
                if (debug){
                    console.log('deletePost(): Transaction successful.')
                }
                //can do other things if successful, like transition pages, etc.
            } else {
                if (debug){
                    console.log('deletePost(): Transaction failed.')
                }
                //can do other things if failed, like scream at user.
            }
        })
    }
}
