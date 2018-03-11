import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './rightSideBar.scss'
import RightSideBarItems from '../rightSideBarItems/rightSideBarItems.js'
import RightSideBarTotal from '../rightSideBarTotal/rightSideBarTotal.js'

/**

@ Alec

@ 2/22/18

@ Purpose: Allows for SideBar component to be displayed on the right.

TODO: Allow for a prop passed in from a parent to determine the positioning (left or right)
        currently this is only a left sidebar.

**/

export class RightSideBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {

    }
    console.log(this.props);
  }

  render () {
    return (
      <div className="rightsidenav">
        <RightSideBarItems />
        <RightSideBarTotal />
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default RightSideBar
