import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import {Stylesheet} from '../stylesheet.js'
import sheet from './topBar.scss'
import LogoIcon from '../assets/Logo.svg'
import SearchIcon from '../assets/SearchIcon.svg'
const neon = require('@cityofzion/neon-js');
const Neon = neon.default;
const node = require('../../../backend/configFiles/blockchain')
const config = require('../../../backend/configFiles/config')
const account = Neon.create.account(config.wif)
const wallet = neon.wallet

/**

@ Alec

@ 2/22/18

Purpose: TopBar component; Provides template for top nav bar

**/

export class TopBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {

    }
    this.zachFunc = this.zachFunc.bind(this);
  }

// My fuc.But. that does stuff.
  zachFunc = () => {
      var myBalance = node.getBalance('AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y')
      console.log('topBar.js: Balance from getBalance(manualAddress): ')
      console.log(myBalance)
      var myBalanceFromAccount = node.getBalance(account.address)
      console.log('topBar.js: Balance from getBalance(account.address): ')
      console.log(myBalanceFromAccount)
      console.log('topBar.js: node.getRPCEndpoint(): ')
      console.log(node.getRPCEndpoint())
      // Invoke a smart contract with a method and an array of strings
      // console.log('Continuing on to testContract and invokeContract')

      // // Testing Function: register()
      // console.log('topBar.js: testing register()')
      // node.testContract('register', ['zack','123'], (res) => {
      //     console.log('topBar.js: node.testContract: ')
      //     console.dir(res)
      // })
      // node.invokeContract('register', ['zack','123'], account, (res) => {
      //     console.log('topBar.js: node.invokeContract(): ')
      //     console.dir(res)
      //     if (res.result === true) {
      //         // Transaction successful. The stored data can be retrieved on the next block.
      //         console.log('topBar.js: invokeContract(): Transaction successful.')
      //     } else {
      //         console.log('topBar.js: invokeContract(): Transaction failed.')
      //     }
      // })

      // // Testing Function: isregister()
      // console.log('topBar.js: testing isregister()')
      // node.testContract('isregister', ['123','zack'], (res) => {
      //     console.log('topBar.js: node.testContract: ')
      //     console.dir(res)
      // })
      // node.invokeContract('isregister', ['123','zack'], account, (res) => {
      //     console.log('topBar.js: node.invokeContract(): ')
      //     console.dir(res)
      //     if (res.result === true) {
      //         // Transaction successful. The stored data can be retrieved on the next block.
      //         console.log('topBar.js: invokeContract(): Transaction successful.')
      //     } else {
      //         console.log('topBar.js: invokeContract(): Transaction failed.')
      //     }
      // })

      // Testing Function: isregister()
      console.log('topBar.js: testing isregister()')
      node.testContract('getclass', ['123','shop','shopping spree',23,3], (res) => {
          console.log('topBar.js: node.testContract: ')
          console.dir(res)
      })
      node.invokeContract('getclass', ['123','shop','shopping spree',23,3], account, (res) => {
          console.log('topBar.js: node.invokeContract(): ')
          console.dir(res)
          if (res.result === true) {
              // Transaction successful. The stored data can be retrieved on the next block.
              console.log('topBar.js: invokeContract(): Transaction successful.')
          } else {
              console.log('topBar.js: invokeContract(): Transaction failed.')
          }
      })

      node.getStorage('123').then((res) => {
          console.log(res)
      })
      neon.create.Balance({
          net: config.RESTEndpoint,
          address: account.address
      })

      // let nBalance = new wallet.Balance({
      //     net: config.RESTEndpoint,
      //     address: account.address
      // })
      // console.log(nBalance)
      // let filledBalance = neon.api.getBalanceFrom(account.address, config.RESTEndpoint).then((res) =>
      //     console.log(filledBalance.assetSymbols)
      // )
  }

  render () {
    return (
      <div className="topnav">
        <NavLink to="/"> <LogoIcon className="logo" /> </NavLink>
        <div className="zachBtn" onClick={this.zachFunc}>
          Property of Zach
        </div>
        <div className="search">
          <SearchIcon className="searchicon" />
          <div className="searchbubble">
            search...
          </div>
        </div>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default TopBar
