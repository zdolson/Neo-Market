import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPageTotalValue.scss'

/**

@ Nicholas 

@ Date: 03/06/18

Purpose: Component for holding the logic/rendering for the total value in the checkOutPage.
         Can possibly be refactored for the checkout sidebar as well.

**/

export class CheckOutPageTotalValue extends Component {
  constructor (props, context) {
    console.log(' was created.')
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    return (
      <div className='checkOutPageTotalValue'>
        Total Value
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPageTotalValue