import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from "./rightSideBarItem.scss"

/**

@ Alec

@ Date: 2/28/18

Purpose: An individual item inside RightSideBarItems

**/

class RightSideBarItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div className="rightSideBarItem">
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default RightSideBarItem
