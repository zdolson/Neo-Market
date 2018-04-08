import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './totalPurchase.scss'

import SellerRating from '../../assets/SellerRating.svg'

/**

@ Victoria/Nicholas

@ 3/4/18

Purpose: Resized purchase button and allowed it to console log message upon clicking.

**/



class TotalPurchase extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Purchase Button was clicked!')
  }

  render () {
    return (
        <div className='purchaseBtn'>
          <button onClick={this.handleClick}>Purchase</button>
          <Stylesheet sheet={sheet} />
        </div>
    )
  }
}

export default TotalPurchase
