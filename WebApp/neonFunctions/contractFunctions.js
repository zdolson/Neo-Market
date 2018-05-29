// import * as firebase from 'firebase'
const firebase = require('firebase')
const neon = require('@cityofzion/neon-js')
const Neon = neon.default
const config = require('./config')
const node = require('./blockchain')
const axios = require("axios")
const account = Neon.create.account(config.wif)
const SHA256 = require('crypto-js/sha256')

const masterList = '1';
var debug = false;


/**

@Zachary Olson

@3/10/2018

@Purpose: Created wrapper functions for most of the smart contract functions.

**/


module.exports = {

    getNeoUsPrice: () => {
        return new Promise ((resolve,reject) => {
            Neon.get.price('NEO').then(price => {
                if (debug) {
                    console.log(price);
                    console.log(typeof(price));
                }
                resolve(price.toString());
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        })
    },

    /*
     * @Function: sha256
     * @Contributor: Zachary Olson
     * @Param: {string} input
     * @Return: {string} hashed input
     * Purpose: Takes input and hashes with SHA256.
     */
    sha256: (input) => {
        return SHA256(input).toString();
    },

    /*
     * @Function: multipurchase
     * @Contributor: Zachary Olson
     * @Param: {string} ownersArray
     * @Param: {string} buyerName
     * @Param: {string} costArray
     * @Return: {promise} sendConfig
     * Purpose: Handles multiple transactions from buyerName to all owners in ownersArray.
     */
    multipurchase: (ownersArray, buyerName, costArray) => {
        return new Promise((resolve,reject) => {
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

            // Gets buyer info from firebase
            firebase.database().ref('/Users/'+buyerName).once('value').then(snapshot => {
                var bWif = snapshot.child('wif').val();
                var buyerAccount = Neon.create.account(bWif);
                var balanceConfig = {
                    net: config.RESTEndpoint,
                    address: buyerAccount.address
                };
                node.getBalance(buyerAccount.address).then(balance => {
                    var multipleIntents = [];
                    // for each user in ownersArray, compare with all other users in ownersArray, strictly moving forward.
                    var i = 0;
                    while (i < ownersArray.length && ownersArray[i] !== null){
                        var currentTotalCost = parseInt(costArray[i]);
                        var j = i + 1;
                        while (j < ownersArray.length && ownersArray[j] !== null){
                            if (ownersArray[i] === ownersArray[j]){
                                currentTotalCost += parseInt(costArray[j]);
                                ownersArray.splice(j, 1);
                                costArray.splice(j, 1);
                                continue;
                            } else {
                                j++;
                            }
                        }
                        costArray[i] = currentTotalCost;
                        i++;
                    }
                    if(debug){
                        console.log('ownersArray after purge: ' + ownersArray);
                        console.log('current size of ownersArray: ' + ownersArray.length);
                    }
                    for (let i = 0; i < ownersArray.length; i++){
                        var currOwnerName = ownersArray[i];
                        firebase.database().ref('/Users/'+currOwnerName).once('value').then(snapshot => {
                            var oWif = snapshot.child('wif').val();
                            var ownerAccount = Neon.create.account(oWif);
                            var currCost = costArray[i];
                            multipleIntents = multipleIntents.concat(neon.api.makeIntent({NEO:currCost}, ownerAccount.address));
                            if (i == ownersArray.length - 1){
                                const sendConfig = {
                                  net: config.RESTEndpoint,
                                  address: buyerAccount.address,  // This is the address which the assets come from.
                                  privateKey: buyerAccount.privateKey,
                                  intents: multipleIntents
                                };
                                Neon.sendAsset(sendConfig).then(sendConfig => {
                                    if (debug) {
                                        console.log(sendConfig.response);
                                    }
                                    resolve(sendConfig);
                                }).catch(sendConfig => {
                                    if (debug) {
                                        console.log(sendConfig);
                                    }
                                    reject(sendConfig);
                                })
                            }
                         })
                     }
                 }).catch(err => {
                     if (debug){
                         console.error('multipurchase(): err: ', err);
                     }
                     reject(err);
                 })
             })
         })
     },

    /*
     * @Function: purchase
     * @Contributor: Zachary Olson
     * @Param: {string} ownerName
     * @Param: {string} buyerName
     * @Param: {string} cost
     * @Return: {promise} sendConfig
     * Purpose: Transfers assets from buyer to owner.
     */
    purchase: (ownerName, buyerName, cost) => {
        return new Promise((resolve,reject) => {
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
            firebase.database().ref('/Users/'+ownerName).once('value').then((snapshot) => {
                var oWif = snapshot.child('wif').val();
                firebase.database().ref('/Users/'+buyerName).once('value').then((snapshot) => {
                    var bWif = snapshot.child('wif').val();
                    var ownerAccount = Neon.create.account(oWif);
                    var buyerAccount = Neon.create.account(bWif);
                    const intent = neon.api.makeIntent({NEO:cost}, ownerAccount.address)
                    const sendConfig = {
                      net: config.RESTEndpoint,
                      address: buyerAccount.address,  // This is the address which the assets come from.
                      privateKey: buyerAccount.privateKey,
                      intents: intent
                   };
                    Neon.sendAsset(sendConfig).then(sendConfig => {
                        if (debug){
                            console.log(sendConfig.response);
                        }
                        resolve(sendConfig);
                    }).catch(sendConfig => {
                        if (debug){
                            console.log(sendConfig);
                        }
                        reject(sendConfig);
                    })
                });
            });
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

    getPostFromStorage: (userPostingAddr) => {
        return new Promise((resolve,reject) => {
            node.getStorage(userPostingAddr).then(userPosting => {
                userPosting = userPosting.replace(/[^\x20-\x7E]/g, '');
                if(debug){
                    console.log('getPostFromStorage(): userPosting: ', userPosting);
                }
                resolve(userPostingAddr + ';' + userPosting);
            }).catch(err => {
                if(debug){
                    console.error('getPostFromStorage(): err: ', err);
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
    getPostingIDsFromUser: (name) => {
        return new Promise((resolve,reject) => {
            node.getStorage(name).then(postingIDsAddr => {
                postingIDsAddr = postingIDsAddr.replace(/[^\x20-\x7E]/g, '');
                node.getStorage(postingIDsAddr).then(postingIDsArray => {
                    postingIDsArray = postingIDsArray.replace(/[^\x20-\x7E]/g, '');
                    postingIDsArray = postingIDsArray.split(',');
                    var i = 0;
                    while (i < postingIDsArray.length && postingIDsArray[i] !== null){
                        if (postingIDsArray[i] == ''){
                            postingIDsArray.splice(i,1);
                            continue;
                        }
                        var j = i + 1;
                        while (j < postingIDsArray.length && postingIDsArray[j] !== null){
                            if (postingIDsArray[i] === postingIDsArray[j]){
                                console.log('i and j: '+i+', '+j);
                                postingIDsArray.splice(j, 1);
                                continue;
                            } else {
                                j++;
                            }
                        }
                        i++;
                    }
                    if (debug){
                        console.log('getPostingIDsFromUser(): postingIDsArray: ', postingIDsArray);
                        console.log(typeof(postingIDsArray));
                    }
                    resolve(postingIDsArray);
                }).catch(err => {
                    if (debug){
                        console.error('getPostingIDsFromUser(): err: ', err);
                    }
                    reject(err);
                })
            }).catch(err => {
                if (debug){
                    console.error('getPostingIDsFromUser(): err: ', err);
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
            module.exports.getPostingIDsFromUser(name).then(postingIDs => {
                var userPosts = [];
                if(debug){
                    console.log(postingIDs);
                }
                for (var i = 0; i < postingIDs.length; i++) {
                    module.exports.getPostFromStorage(postingIDs[i]).then((post) => {
                        if (debug) {
                            console.log('getUserPostsFromStorage(): post: ', post);
                        }
                        let cutPost = post.split(';');
                        if (debug) {
                            console.log('getUserPostsFromStorage(): cutPosts: ', cutPost);
                        }
                        var currItem = {
                          id: cutPost[0],
                          owner: cutPost[1],
                          title: cutPost[2],
                          description: cutPost[3],
                          price: cutPost[4],
                          amount: cutPost[5],
                          imageRef: cutPost[6],
                          isPurchased: cutPost[7]
                        }
                        if (debug) {
                            console.log('getUserPostsFromStorage(): currItem: ', currItem);
                        }
                        userPosts.push(currItem);
                        if(userPosts.length == postingIDs.length) {
                            if (debug){
                                console.log('getUserPostsFromStorage(): userPosts: ', userPosts);
                                console.log(userPosts.length);
                            }
                            resolve(userPosts);
                        }
                    }).catch(err => {
                        if (debug){
                            console.error('getUserPostsFromStorage(): err: ', err);
                        }
                        reject(err);
                    })
                }
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
     * @Param: instance that
     * @Return: {string array} allPosts
     * Purpose: Returns and sets the items state in the instance provided with an array of listings from the SC.
     */
    getAllPostsFromStorage: (that) => {
        return new Promise((resolve,reject) => {
            var allPosts = [];
            var currItem = {};
            module.exports.getAllUsersFromStorage().then(userList => {
                for (var i = 0; i < userList.length - 1; i++) {
                    module.exports.getUserPostsFromStorage(userList[i]).then((userPosts) => {
                        if (debug) {
                            console.log('getAllPostsFromStorage(): userPosts: ', userPosts);
                        }
                        allPosts = allPosts.concat(userPosts);
                        if(i == userList.length -1) {
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
     * @Param: {string} imageRef
     * @Param: {boolean} isPurchased
     * @Return: Nothing
     * Purpose: Creates a Post on the smart contract.
     *          Calls invokeContract() with createpost function to smart contract.
     */
    createPost: (id, owner, title, desc, price, amount, imageReg, isPurchased) => {
        node.invokeContract('createpost', [id,owner,title,desc,price,amount, imageRef, isPurchased], account, (res) => {
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

    /*
     * @Function: editPost
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
    editPost: (id, owner, title, desc, price, amount, imageRef, isPurchased) => {
        id = id.replace(/[^\x20-\x7E]/g, '');
        owner = owner.replace(/[^\x20-\x7E]/g, '');
        title = title.replace(/[^\x20-\x7E]/g, '');
        desc = desc.replace(/[^\x20-\x7E]/g, '');
        // price = price.replace(/[^\x20-\x7E]/g, '');
        // amount = amount.replace(/[^\x20-\x7E]/g, '');
        console.log(id+owner+title+desc+price+amount);
        node.invokeContract('editpost', [id,owner,title,desc,price,amount,imageRef,isPurchased], account, (res) => {
            if (debug){
                console.log('editPost(): res: ');
                console.dir(res);
            }
            if (res.result === true) {
                if (debug){
                    console.log('editPost(): Transaction successful.')
                }
                //can do other things if successful, like transition pages, etc.
            } else {
                if (debug){
                    console.log('editPost(): Transaction failed.')
                }
                //can do other things if failed, like scream at user.
            }
        })
    },

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
