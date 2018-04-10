import React, { Component } from 'react'
import RightSideBarTotal from '../components/rightSideBarTotal/rightSideBarTotal.js'

/**

@ Alec

@ 4/8/18

@ Purpose: Provides a mock component that calls RightSideBarTotal and provides it with mock data

**/

class RightSideBarTotalMock extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
    this.sumTotalCartItems = this.sumTotalCartItems.bind(this);
  }

  sumTotalCartItems () {
    cartItems = [
      { id: 1, owner: 'Alec', price: 20, amount: 1, description: 'item', title: 'title', imgName: 'imgName' },
      { id: 1, owner: 'Alec', price: 200, amount: 1, description: 'item', title: 'title', imgName: 'imgName' }
    ];
    for (var i = 0; i < cartItems.length; i++){
      var currCartItem = cartItems[i]
      currTotal = currTotal + currCartItemData['price']
    }
    return currTotal
  }

  render () {
    return (
      <RightSideBarTotal sumTotalCartItems={this.sumTotalCartItems}/>
    )
  }
}

export default RightSideBarTotalMock
