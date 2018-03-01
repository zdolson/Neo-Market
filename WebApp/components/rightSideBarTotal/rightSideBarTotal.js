import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './rightSideBarTotal.scss'
import TotalLine from '../assets/TotalLine.svg'

/**

@ Alec

@ 2/28/18

@ Purpose: Price of items in cart at the bottom of RightSideBar

**/

class RightSideBarTotal extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div className="rightSideBarTotal">
        <div className="totalText">Total $</div>
        <TotalLine />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default RightSideBarTotal
