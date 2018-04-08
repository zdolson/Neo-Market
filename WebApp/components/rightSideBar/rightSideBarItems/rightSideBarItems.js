import React, { Component } from 'react'

import { Stylesheet } from '../../stylesheet.js'
import sheet from './rightSideBarItems.scss'

import RightSideBarItem from './rightSideBarItem/rightSideBarItem.js'

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
    var cartItems = this.props.cartItems
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID
    var removeCartItem = this.props.removeCartItem
    var addCartItem = this.props.addCartItem

    return (
      <div className="rightSideBarItems">
        {this.props.cartItems.map( (id, key) => {
          var currCheckOutItem = returnCheckOutDataByID(id)
          return (
            <RightSideBarItem currCheckOutItem={currCheckOutItem} removeCartItem={removeCartItem}/>
          )
        })}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default RightSideBarItems
