import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './purchasesTab.scss'
import PurchasedItem from './purchasedItem/purchasedItem.js'

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
    let items = this.props.state.items;
    const { data } = this.props
    console.debug('Data is ', data)
    return (
      <div className="purchasesPageContainer">

        {items.map( (item, key) => {
          return (
            <PurchasedItem item={item}/>
          );
        })}

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PurchasesTab
