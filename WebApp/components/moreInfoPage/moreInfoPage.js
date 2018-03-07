import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'

export class moreInfoPage extends Component {
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
      <div>
        <h3> moreInfoPage </h3>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default moreInfoPage
