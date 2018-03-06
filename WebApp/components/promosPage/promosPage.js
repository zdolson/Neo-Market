import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './promosPage.scss'

export class promosPage extends Component {
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
        <h3> promosPage </h3>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default promosPage
