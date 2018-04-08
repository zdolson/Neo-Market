import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './rightAccountBar.scss'

import RightAccountBarContent from './rightAccountBarContent/rightAccountBarContent.js'

/**

@ Alec

@ 2/26/18

Purpose: RightAccountBar; rectangle above the right side bar

**/

export class RightAccountBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  neoInteraction = () => {
    console.log("Zach pressed me.")
  }

  render () {
    return (
      <div className="rightAccountNav">
        <RightAccountBarContent />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default RightAccountBar
