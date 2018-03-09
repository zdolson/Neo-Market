  import React, { Component } from 'react'
  import { Stylesheet } from '../stylesheet.js'
  import sheet from './checkOutTableItems.scss'
  import CheckOutTableItem from '../checkOutTableItem/checkOutTableItem.js'

  /**

  @ Victoria/Nicholas 

  @ 03/06/18

  @ Purpose: Item component for each checkOutItem. 
             This would be the component where you list all of the items that are in checkout.
  **/

  export class CheckOutTableItems extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = {

      }
    }

    render () {
      return (
        <div className='checkoutItems'>
          <CheckOutTableItem />
          <CheckOutTableItem />
          <CheckOutTableItem />
        </div>
      )
    }
  }

  export default CheckOutTableItems;
