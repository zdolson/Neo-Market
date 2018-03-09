import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './peoplePage.scss'

/**

@ Nicholas

@ 03/04/2018

Purpose: Component page for logic/render for the people page.

**/

export class PeoplePage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  componentDidMount () {
    console.debug('peoplePage Loaded');
  }

  render () {
    const { data } = this.props
    console.debug('Data is ', data)
    return (
      <div>
        <h3> peoplePage </h3>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PeoplePage
