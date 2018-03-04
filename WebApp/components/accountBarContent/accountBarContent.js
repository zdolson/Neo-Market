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
    var myBalance = node.getBalance('AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y')
    console.log('accountBarContent.js: Balance from getBalance(manualAddress): ')
    console.log(myBalance)
    var myBalanceFromAccount = node.getBalance(account.address)
    console.log('accountBarContent.js: Balance from getBalance(account.address): ')
    console.log(myBalanceFromAccount)
    console.log('accountBarContent.js: node.getRPCEndpoint(): ')
    console.log(node.getRPCEndpoint())
    // Invoke a smart contract with a method and an array of strings
    // console.log('Continuing on to testContract and invokeContract')

    node.testContract('register', ['zack','123'], (res) => {
        console.log('accountBarContent.js: node.testContract: ')
        console.dir(res)
    })
    node.invokeContract('register', ['zack','123'], account, (res) => {
        console.log('accountBarContent.js: node.invokeContract(): ')
        console.dir(res)
        if (res.result === true) {
            // Transaction successful. The stored data can be retrieved on the next block.
            console.log('accountBarContent.js: invokeContract(): Transaction successful.')
        } else {
            console.log('accountBarContent.js: invokeContract(): Transaction failed.')
        }
    })

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
