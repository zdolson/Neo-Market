import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './accountBarContent.scss'
const neon = require('@cityofzion/neon-js');
const Neon = neon.default;
const node = require('../../../backend/configFiles/blockchain')
const config = require('../../../backend/configFiles/config')
const account = Neon.create.account(config.wif)

/**

@ Alec

@ 2/20/18

Purpose: AccountBarContent; Fills the AccountBar component with content

**/

export class AccountBarContent extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  neoInteraction = () => {
    console.log("Put Neo functionality here!!!")
    var myBalance = node.getBalance('AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y')
    console.log(myBalance)
    console.log(node.getRPCEndpoint())

    // Invoke a smart contract with a method and an array of strings
    /*
    console.log("Hello World")
    console.log('DJAOWIJDIWAJDOJAWOIDJ')
    node.invokeContract('register', ['zack', 'Hello World!'], account, (res) => {
        console.log('inside of invokeContract from accountBarContents.js')
        if (res.result === true) {
            // Transaction successful. The stored data can be retrieved on the next block.
            console.log('Transaction processed!')
        } else {
            console.log('Transaction has not been processed.')
        }
    })
    */
  }

  render () {
    return (
      <div className="accountNavContent">
        <button onClick={this.neoInteraction}>Press Me Zack</button>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default AccountBarContent
