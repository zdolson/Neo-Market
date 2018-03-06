import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './leftSideBar.scss'
import { sideBarTitles } from '../data.js'

import SideBarItem from '../leftSideBarItem/leftSideBarItem'

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
  }

  render () {
    return (
      <div className="sidenav">
        <div className="sideNavItems">
          {sideBarTitles.map(name => {
            return (
              <SideBarItem title={name} />
            )
          })}
        </div>
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default LeftSideBar
