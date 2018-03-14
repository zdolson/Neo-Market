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
    this.isRegister = this.isRegister.bind(this);
  }


  isRegister = () => {

      // cF.register('42','satan');
      // cF.isRegister('42','satan');
      // cF.createPost('123','satan','rice','fried rice brah','3','1');
      // cF.createPost('123','satan','Vs','dem victories breh','9000','1');
      // cF.accessStorage('1');
      // cF.getUserPostsFromStorage('42');



      // cF.register('79','tom');
      // cF.isRegister('79','tom');
      // cF.createPost('10','tom','bananas','soooo yellow','10','6');
      cF.createPost('13','tom','fathead','much big','12','1');

      // cF.getUserPostsFromStorage('tom').then(users => {
      //     console.log(users)
      // }).catch(err => {
      //     console.error(err)
      // })
      // cF.getAllPostsFromStorage();

      // cF.createPost('456','jesus','eggs','friedeggs','1','12');
      // cF.accessStorage('666');
      // cF.register('666','jesus');

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


  render () {
    return (
      <div className="topnav">
        <NavLink to="/" className="logo"> <LogoIcon /> </NavLink>
        <div className="zachBtn" onClick={this.isRegister}>
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
