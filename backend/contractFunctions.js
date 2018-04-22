// import * as firebase from 'firebase'
const firebase = require('firebase')
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
     * @Function: purchase
     * @Contributor: Zachary Olson
     * @Param: {string} ownerName
     * @Param: {string} buyerName
     * @Return:
     * Purpose: Transfers assets from buyer to owner.
     */
    purchase: (ownerName, buyerName) => {
        return new Promise((resolve,reject) => {

            //Need to get both WIFs from Firebase using ownerName and buyerName
            // Temporarily store retrieved WIF in variables for account creation
            var firebaseConfig = {
              apiKey: "AIzaSyAm2AxvW9dp_lAsP_hvgAUYnGWKGro8L00",
              authDomain: "neo-market-8a303.firebaseapp.com",
              databaseURL: "https://neo-market-8a303.firebaseio.com",
              projectId: "neo-market-8a303",
              storageBucket: "neo-market-8a303.appspot.com",
              messagingSenderId: "1035941360979"
            };

            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            // Need authentication to allow access to database.
            firebase.auth().signInWithEmailAndPassword('nccheung@ucsc.edu', 'nccheung').then(console.log('Login successfully')).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
            });


            firebase.database().ref('/Users/'+ownerName).once('value').then((snapshot) => {
                var oWif = snapshot.child('wif').val();
                console.log(oWif);
                firebase.database().ref('/Users/'+buyerName).once('value').then((snapshot) => {
                    var bWif = snapshot.child('wif').val();
                    console.log(bWif);

                    var ownerAccount = Neon.create.account(oWif);
                    var buyerAccount = Neon.create.account(bWif);
                    // console.log(ownerAccount.address);
                    const intents = neon.api.makeIntent({NEO:1}, ownerAccount.address)

                    console.log(config.RESTEndpoint);
                    console.log(buyerAccount.address);
                    console.log(buyerAccount.privateKey);
                    console.log(intents);
                    const sendConfig = {
                      net: config.RESTEndpoint,
                      address: buyerAccount.address,  // This is the address which the assets come from.
                      privateKey: buyerAccount.privateKey,
                      intents: intents
                   };

                    Neon.sendAsset(sendConfig).then(sendConfig => {
                        console.log(sendConfig.response)
                        resolve(sendConfig);
                    }).catch(sendConfig => {
                        console.log(sendConfig)
                        reject(sendConfig);
                    })
                });
            });

            //------------- Working shit below.
            // var oWif = 'KySLWEJDrGh7HmnZNVP3QzvkFBdDHX3dX7qh7tamxrpTcM1GNrkh'; //w2.wallet testing123
            // var bWif = 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr'; //w1.wallet coz

        })
    },

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
    getAllPostsFromStorage: (that) => {
        return new Promise((resolve,reject) => {
            var allPosts = [];
            var currItem = {};
            module.exports.getAllUsersFromStorage().then(userList => {
                for (var i = 0; i < userList.length -1; i++) {
                    module.exports.getUserPostsFromStorage(userList[i]).then((posts) => {
                        if (debug) {
                            console.log('getAllPostsFromStorage(): posts: ', posts);
                            console.log('getAllPostsFromStorage(): currItem: ', currItem);
                        }
                        if (posts.length > 1){
                            let cutPosts = posts[0].split(',');
                            if (debug) {
                                console.log('getAllPostsFromStorage(): cutPosts: ', cutPosts);
                            }
                            currItem = {
                              id: cutPosts[0],
                              owner: cutPosts[1],
                              title: cutPosts[2],
                              description: cutPosts[3],
                              price: cutPosts[4],
                              amount: cutPosts[5],
                            }
                            if (debug) {
                                console.log('getAllPostsFromStorage(): currItem: ', currItem);
                            }
                            allPosts.push(currItem);
                        }
                        if(i == userList.length - 1) {
                            if (debug){
                                console.log('getAllPostsFromStorage(): allPosts: ', allPosts);
                            }
                            that.setState({ items: allPosts});
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
