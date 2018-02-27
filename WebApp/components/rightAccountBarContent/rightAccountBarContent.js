import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './rightAccountBarContent.scss'

/**

@ Alec

@ 2/26/18

Purpose: rightAccountBarContent; Fills the RightAccountBar component with content

**/

export class RightAccountBarContent extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  neoInteraction = () => {
    console.log("Put Neo functionality here!!!")
  }

  render () {
    return (
      <div className="rightAccountNavContent">
        <button onClick={this.neoInteraction}>Press Me Zach</button>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default RightAccountBarContent
