import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './rightAccountBarContent.scss'

import CartIcon from '../../assets/CartIcon.svg'
import DownArrowIcon from '../../assets/DownArrowIcon.svg'

// Import for react-router package.
import {
  Route,
  NavLink,
  Link,
  BrowserRouter
} from "react-router-dom";

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
    var cartItems = this.props.cartItems;
    if(cartItems.length <= 0){
      return (
        <div className="rightAccountNavContent">
          <CartIcon className="cartIcon"/>
          <p>CheckOut</p>
          <DownArrowIcon className="downArrowIcon"/>
          <Stylesheet sheet={sheet} />
        </div>
      )
    }
    else{
      return (
        <div className="rightAccountNavContent">
          <CartIcon className="cartIcon"/>
          <NavLink to={"/CheckOut"}> <p>CheckOut</p> </NavLink>
          <DownArrowIcon className="downArrowIcon"/>
          <Stylesheet sheet={sheet} />
        </div>
      )
    }
  }
}

export default RightAccountBarContent
