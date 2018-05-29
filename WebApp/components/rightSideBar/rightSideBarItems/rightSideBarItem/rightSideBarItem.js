import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from "./rightSideBarItem.scss"

import ItemX from '../../../assets/ItemX.svg'

import * as firebase from 'firebase'
import {removeCartItemFromDatabase} from '../../../../components/fireBaseFunctions.js'
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
    this.removeCartItemHandler = this.removeCartItemHandler.bind(this);
  }

  removeCartItemHandler = () => {
    var that = this
    removeCartItemFromDatabase(this.props.currCheckOutItem['id'], that).then(function() {
      that.props.removeCartItem(that.props.currCheckOutItem['id'])
    })
  }

  render () {
    var currCheckOutItem = this.props.currCheckOutItem
    var removeCartItem = this.props.removeCartItem

    return (
      <div className="rightSideBarItem">

        <div className="itemX" onClick={this.removeCartItemHandler}> <ItemX className="xSVG"/> </div>

        <div className="rightSideBarItemTitle">
          {currCheckOutItem['title']}
        </div>

        <div className="rightSideBarItemTotal">
          {currCheckOutItem['price']}
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default RightSideBarItem
