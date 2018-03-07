import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './makePost.scss'

/**

@ Nicholas

@ 03/04/2018

Purpose: Component page for logic/render for the make post.

**/

export class MakePost extends Component {
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
        <h3> makePost </h3>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MakePost
