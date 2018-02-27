import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './leftAccountBarContent.scss'

/**

@ Alec

@ 2/20/18

Purpose: LeftAccountBarContent; Fills the LeftAccountBar component with content

**/

export class LeftAccountBarContent extends Component {
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
      <div className="leftAccountNavContent">
        <button onClick={this.neoInteraction}>Press Me Zach</button>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default LeftAccountBarContent
