
import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './leftSideBar.scss'
import { sideBarTitles } from '../data.js'

import SideBarItem from './leftSideBarItem/leftSideBarItem'
import {logoutUser} from '../fireBaseFunctions.js'

/**

@ Victoria

@ 04/20/18

**/

export class LeftSideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {

    }
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler = () => {
    logoutUser();
  }

  render () {
    return (
      <div className="sidenav">
        <div className="sideNavItems">
          {sideBarTitles.map(name => {
            return (
              <SideBarItem key={name} title={name} />
            )
          })}
        </div>
        <div className="logoutBtn" onClick={this.logoutHandler}>
          Logout
        </div>
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default LeftSideBar
