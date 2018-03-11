import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPageTitle.scss'

/**

@ Nicholas 

@ Date: 03/06/18

Purpose: Component for holding the logic/rendering of the Title of the item in the checkOutPage

**/

export class CheckOutPageTitle extends Component {
  constructor (props, context) {
    console.log('checkOutPageTitle was created.')
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    return (
      <div className='checkOutPageTitle'>
        {this.props.currCheckOutItemTitle}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPageTitle