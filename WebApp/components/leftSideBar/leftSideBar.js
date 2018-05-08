import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './leftSideBar.scss'
import { sideBarTitles } from '../data.js'

import SideBarItem from './leftSideBarItem/leftSideBarItem'

import { logoutUser } from '../fireBaseFunctions.js'
/**

@ Alec

@ 2/20/18

Purpose: SideBar component; Provides template for left sidebar.

TODO: Allow for a prop passed in from a parent to determine the positioning (left or right)
        currently this is only a left sidebar.

**/

export class LeftSideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {

    }
    this.LogoutHandler = this.LogoutHandler.bind(this);
  }

  LogoutHandler = () => {
    logoutUser()
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
            <div className="sideNavLogout">
              <div className="LogoutButton" onClick={this.LogoutHandler}>
                <div className="LogoutButtonText">
                  Log Out
                </div>
              </div>
            </div>
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default LeftSideBar
