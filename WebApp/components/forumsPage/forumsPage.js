import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './forumsPage.scss'

export class forumsPage extends Component {
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
        <h3> forumsPage </h3>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default forumsPage
