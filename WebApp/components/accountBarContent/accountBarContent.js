import React, { Component } from 'react'
import Stylesheet from '../stylesheet.js'
import sheet from './accountBarContent.scss'

/**

@ Alec

@ 2/20/18

Purpose: AccountBarContent; Fills the AccountBar component with content

**/

export class AccountBarContent extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    return (
      <div className="accountNavContent">
        Yolo
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default AccountBarContent
