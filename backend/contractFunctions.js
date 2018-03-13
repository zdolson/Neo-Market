const neon = require('@cityofzion/neon-js')
const Neon = neon.default
const config = require('./configFiles/config')
const node = require('./configFiles/blockchain')
const axios = require("axios")
const account = Neon.create.account(config.wif)


/**

@Zachary Olson

@3/10/2018

@Purpose: Created wrapper functions for most of the smart contract functions.

**/


module.exports = {

    /*
     * @Function: accessStorage
     * @Contributor: Zachary Olson
     * @Param: {string} name
     * @Return: {string} res
     * Purpose: Returns the string of information stored on the smart contract under the specified user.
     */
    accessStorage: (name) => {
        node.getStorage(name).then((res) => {
            console.log(res)
            return res
        })
    },

    /*
     * @Function: register
     * @Contributor: Zachary Olson
     * @Param: {string} name
     * @Param: {string} address
     * @Return: Nothing
     * Purpose: Register a new user on the smart contract.
     *          Calls invokeContract() with register function to smart contract.
     */
    register: (name, address) => {
        node.invokeContract('register', [address, name], account, (res) => {
            console.log('contractFunctions.js: invokeContract(register)')
            console.dir(res)
            if (res.result === true) {
                console.log('contractFunctions.js: invokeContract(register): Transaction successful.')
            } else {
                console.log('contractFunctions.js: invokeContract(register): Transaction failed.')
            }
        })
    },

    /*
     * @Function: isRegister
     * @Contributor: Zachary Olson
     * @Param: {string} name
     * @Param: {string} address
     * @Return: Nothing
     * Purpose: Checks if user is already registered on smart contract.
     *          Calls invokeContract() with isregister function to smart contract.
     */
    isRegister: (name, address) => {
        node.invokeContract('isregister', [address, name], account, (res) => {
            console.log('contractFunctions.js: invokeContract(isRegister)')
            console.dir(res)
            if (res.result === true) {
                console.log('contractFunctions.js: invokeContract(isRegister): Transaction successful.')
            } else {
                console.log('contractFunctions.js: invokeContract(isRegister): Transaction failed.')
            }
        })
    },

    /*
     * @Function: getClass
     * @Contributor: Zachary Olson
     * @Param: {string} owner
     * @Param: {string} title
     * @Param: {string} desc
     * @Param: {int} price
     * @Param: {int} amount
     * @Return: Nothing
     * Purpose: Used for testing creating a Post on the smart contract.
     *          Calls invokeContract() with getclass function to smart contract.
     */
    getClass: (owner, title, desc, price, amount) => {
        node.invokeContract('getclass', [owner,title,desc,price,amount], account, (res) => {
            console.log('contractFunctions.js: invokeContract(getClass)')
            console.dir(res)
            if (res.result === true) {
                console.log('contractFunctions.js: invokeContract(getClass): Transaction successful.')
            } else {
                console.log('contractFunctions.js: invokeContract(getClass): Transaction failed.')
            }
        })
    },

    /*
     * @Function: createPost
     * @Contributor: Zachary Olson
     * @Param: {string} owner
     * @Param: {string} title
     * @Param: {string} desc
     * @Param: {int} price
     * @Param: {int} amount
     * @Return: Nothing
     * Purpose: Creates a Post on the smart contract.
     *          Calls invokeContract() with createpost function to smart contract.
     */
    createPost: (id, owner, title, desc, price, amount) => {
        node.invokeContract('createpost', [id,owner,title,desc,price,amount], account, (res) => {
            console.log('contractFunctions.js: invokeContract(createPost)')
            console.dir(res)
            if (res.result === true) {
                console.log('contractFunctions.js: invokeContract(createPost): Transaction successful.')
            } else {
                console.log('contractFunctions.js: invokeContract(createPost): Transaction failed.')
            }
        })
    },

    /*
     * @Function: getPost
     * @Contributor: Zachary Olson
     * @Param: {string} owner
     * @Param: {string} title
     * @Return: Nothing
     * Purpose: Retrieves Post under owner's storage on the smart contract and prints to prompt.py.
     *          Calls invokeContract() with getpost function to smart contract.
     */
    getPost: (owner, title) => {
        node.invokeContract('getpost', [owner,title], account, (res) => {
            console.log('contractFunctions.js: invokeContract(getPost)')
            console.dir(res)
            if (res.result === true) {
                console.log('contractFunctions.js: invokeContract(getPost): Transaction successful.')
            } else {
                console.log('contractFunctions.js: invokeContract(getPost): Transaction failed.')
            }
        })
    },

    // NOT YET IMPLEMENTED!
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
            console.log('contractFunctions.js: invokeContract(deletePost)')
            console.dir(res)
            if (res.result === true) {
                console.log('contractFunctions.js: invokeContract(deletePost): Transaction successful.')
            } else {
                console.log('contractFunctions.js: invokeContract(deletePost): Transaction failed.')
            }
        })
    },

    // Testing Function: register()
    testRegister: (name, address) => {
        node.testContract('register', [address, name], (res) => {
            console.log('contractFunctions.js: testing register() result:')
            console.dir(res)
        })
    },

    // Testing Function: isRegister()
    testIsRegister: (name, address) => {
        node.testContract('isregister', [address, name], (res) => {
            console.log('contractFunctions.js: testing isRegister() result:')
            console.dir(res)
        })
    },

    // Testing Function: getPost()
    testGetPost: (owner, title) => {
        console.log('contractFunctions.js: testing getPost()')
        node.testContract('getpost', [owner,title], (res) => {
            console.log('contractFunctions.js: testing getPost() result:')
            console.dir(res)
        })
    },

    // Testing Function: getClass()
    testGetClass: (owner, title, desc, price, amount) => {
        console.log('contractFunctions.js: testing getClass()')
        node.testContract('getclass', [owner,title,desc,price,amount], (res) => {
            console.log('contractFunctions.js: testing getClass() result:')
            console.dir(res)
        })
    },

    // Testing Function: createPost()
    testCreatePost: (owner, title, desc, price, amount) => {
        console.log('contractFunctions.js: testing createPost()')
        node.testContract('createpost', [owner,title,desc,price,amount], (res) => {
            console.log('contractFunctions.js: testing createPost() result:')
            console.dir(res)
        })
    },

    // NOT YET IMPLEMENTED!
    // Testing Function: deletePost()
    testDeletePost: (owner, index) => {
        console.log('contractFunctions.js: testing deletePost()')
        node.testContract('deletepost', [owner,index], (res) => {
            console.log('contractFunctions.js: testing deletePost() result:')
            console.dir(res)
        })
    }

}
