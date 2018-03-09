import React, { Component } from 'react'

import { Stylesheet } from '../stylesheet.js'
import sheet from './rightSideBarItems.scss'

import RightSideBarItem from '../rightSideBarItem/rightSideBarItem.js'

/**

@ Alec

@ 2/28/18

@ Purpose: Container holding all cart items

**/

class RightSideBarItems extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div className="rightSideBarItems">
        <RightSideBarItem />
        <RightSideBarItem />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default RightSideBarItems
