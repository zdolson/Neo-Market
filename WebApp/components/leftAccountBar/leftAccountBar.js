import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './leftAccountBar.scss'

import LeftAccountBarContent from './leftAccountBarContent/leftAccountBarContent.js'

/**

@ Alec

@ 2/20/18

Purpose: SideBar component; Provides template for left and right sidebar

TODO: allow for a prop passed in from a parent to determine the positioning (left or right)
      currently this is only a left accountBar

**/

export class LeftAccountBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div className="leftAccountNav">
        <LeftAccountBarContent />
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default LeftAccountBar
