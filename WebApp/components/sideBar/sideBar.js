import React, { Component } from 'react'
import Stylesheet from '../stylesheet.js'
import sheet from './sideBar.scss'
import { sideBarTitles } from '../data.js'

import SideBarItem from '../sideBarItem/sideBarItem'

/**

@ Alec

@ 2/20/18

Purpose: SideBar component; Provides template for left and right sidebar.

TODO: Allow for a prop passed in from a parent to determine the positioning (left or right)
        currently this is only a left sidebar.

TODO: Fix logic for dynamically creating SideBarItem components.
      For some reason, whichever Icon component is used first is then subsequently
        used for the rest of the SideBarItems.

**/

export class SideBar extends Component {
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

export default SideBar
