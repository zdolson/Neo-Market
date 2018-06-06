import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './checkOutTableItem.scss'

import CheckOutPagePicture from './checkOutPagePicture/checkOutPagePicture.js'
import CheckOutPageItemContent from './checkOutPageItemContent/checkOutPageItemContent.js'

import ItemX from '../../../assets/ItemX.svg'
import {removeCartItemFromDatabase} from '../../../../components/fireBaseFunctions.js'

/**

@ Victoria/Nicholas

@ 3/4/18

Purpose: Component for creating each box-item in the checkout page

**/

class CheckOutTableItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

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
      <div className='checkOutTableItem'>
        <div className="itemWrapper">
          <CheckOutPagePicture imgRef={currCheckOutItem.imageRef} />
          <div className="itemSeperator"></div>
          <CheckOutPageItemContent currCheckOutItem={currCheckOutItem}/>
          <div className="itemX" onClick={this.removeCartItemHandler}> <ItemX/> </div>
          <Stylesheet sheet={sheet} />
        </div>
      </div>
    )
  }
}

export default CheckOutTableItem
