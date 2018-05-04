import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './purchasesTab.scss'
import PurchasedItems from './purchasedItems/purchasedItems.js'

/**

@ Victoria

@ 04/20/2018

Purpose: Component page for logic/render for the purchases page.

**/

export class PurchasesTab extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    const { data } = this.props
    console.debug('Data is ', data)
    return (
      <div className="purchasesPageContainer">

        <div className="header">
          <div> My Purchases </div>
          <div className="underline"></div>
        </div>

        <PurchasedItems />

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PurchasesTab
