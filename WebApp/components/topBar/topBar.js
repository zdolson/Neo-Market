import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import {Stylesheet} from '../stylesheet.js'
import sheet from './topBar.scss'
import LogoIcon from '../assets/Logo.svg'
import SearchIcon from '../assets/SearchIcon.svg'
// import cF from '../../../backend/contractFunctions'

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
    this.isRegister = this.isRegister.bind(this);
    this.LogoutHandler = this.LogoutHandler.bind(this);
  }

  LogoutHandler = () => {
    logoutUser()
  }

  isRegister = () => {
  }

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
