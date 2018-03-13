import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import {Stylesheet} from '../stylesheet.js'
import sheet from './topBar.scss'
import LogoIcon from '../assets/Logo.svg'
import SearchIcon from '../assets/SearchIcon.svg'
import cF from '../../../backend/contractFunctions'

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
  }


// // My fuc.But. that does stuff.
//   zachFunc = () => {
//       // var myBalance = node.getBalance('AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y')
//       // console.log('topBar.js: Balance from getBalance(manualAddress): ')
//       // console.log(myBalance)
//       // var myBalanceFromAccount = node.getBalance(account.address)
//       // console.log('topBar.js: Balance from getBalance(account.address): ')
//       // console.log(myBalanceFromAccount)
//       // console.log('topBar.js: node.getRPCEndpoint(): ')
//       // console.log(node.getRPCEndpoint())
//
//
//       // cF.register('tom','456')
//       // cF.isRegister('tom','456')
//       // cF.createPost('tom','test post','make a post here.',3,1)
//       // cF.getPost('tom','test post')
//       // cF.deletePost()
//       // cF.accessStorage('tom')
//
//
//       // neon.create.Balance({
//       //     net: config.RESTEndpoint,
//       //     address: account.address
//       // })
//
//       // let nBalance = new wallet.Balance({
//       //     net: config.RESTEndpoint,
//       //     address: account.address
//       // })
//       // console.log(nBalance)
//       // let filledBalance = neon.api.getBalanceFrom(account.address, config.RESTEndpoint).then((res) =>
//       //     console.log(filledBalance.assetSymbols)
//       // )
//   }


// Old render button part.
// <div className="zachBtn" onClick={this.zachFunc}>
//   Property of Zach
// </div>

  render () {
    return (
      <div className="topnav">
        <NavLink to="/" className="logo"> <LogoIcon /> </NavLink>
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
