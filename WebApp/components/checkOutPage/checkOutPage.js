import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPage.scss'

export class checkOutPage extends Component {
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
      <div className="checkOutPage">
        <div className="header">
          <h1> Items </h1>
        </div>

        <CheckOutItem />
        <CheckOutItem />

        <div className="checkOutTotal">
          <h1> Total:  </h1>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default checkOutPage
