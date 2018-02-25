import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './topBar.scss'
// import { sideBarTitles } from '../data.js'
import LogoIcon from '../assets/Logo.svg'

/**

@ Alec

@ 2/22/18

Purpose: TopBar component; Provides template for top nav bar

**/

export class SideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div className="topnav">
        <LogoIcon />
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default SideBar
