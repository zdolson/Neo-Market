import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './rightAccountBarContent.scss'

import CartIcon from '../assets/CartIcon.svg'
import DownArrowIcon from '../assets/DownArrowIcon.svg'

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
        <CartIcon className="cartIcon"/>
        <p>My Cart</p>
        <DownArrowIcon className="downArrowIcon"/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default RightAccountBarContent
