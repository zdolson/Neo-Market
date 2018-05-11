import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import {Stylesheet} from '../stylesheet.js'
import sheet from './topBar.scss'
import LogoIcon from '../assets/Logo.svg'
import SearchIcon from '../assets/SearchIcon.svg'
import cF from '../../neonFunctions/contractFunctions'
import node from '../../neonFunctions/blockchain'
// const neon = require('@cityofzion/neon-js')
// const Neon = neon.default

import { logoutUser } from '../fireBaseFunctions.js'

/**

@ Alec

@ 2/22/18

Purpose: TopBar component; Provides template for top nav bar

**/

export class TopBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
    this.topbarTestingButton = this.topbarTestingButton.bind(this);
    this.LogoutHandler = this.LogoutHandler.bind(this);
  }

  LogoutHandler = () => {
    logoutUser()
  }

  topbarTestingButton = () => {
      // cF.purchase('dlang','zdolson');
      // cF.register('tom','20');
      // cF.createPost('123', 'tom', 'diary', 'tom riddle\'s diary', '3', '1');
      // cF.createPost('321','tom','wand','the elder wand foo','10','1');
      // cF.register('homie','42');
      // cF.createPost('456','homie','water bottle','its a water bottle','2','1');
      // cF.register('zdolson', '11');
      // node.getBalance('AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y').then(balance => {
      //     console.log(balance);
      // });
      // node.getRPCEndpoint().then(rpcEndpoint => {
      //     var client = Neon.create.rpcClient(rpcEndpoint);
      //     client.getRawTransaction("6f0a48873919d61b853f6d6d587538e8b4f2c12f26e517ecd00cf603b910e254",1).then(tx => {
      //         console.log(tx);
      //     })
      // })
      // cF.getContractState().then(state => {
      //     console.log(state);
      // })
      console.log(cF.sha256('test') === cF.sha256('test'));

      // <div className="zachBtn" onClick={this.topbarTestingButton}>
      //   Property of Zach
      // </div>
  }

  render () {
    return (
      <div className="topnav">
        <NavLink to="/" className="logo"> <LogoIcon /> </NavLink>
        <div className="search">
          <div className="filter">
            filter
          </div>
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
