import React, { Component } from 'react'

import {Stylesheet} from '../components/stylesheet.js'
import sheet from '../components/base.scss'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'

import App from '../components/app/app.js'

/**

@ Nicholas

@ 03/04/2018

Purpose: index page component to allow for navigation to the posts page.

**/

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      error: '',
      cart: ['yolo', 'swag'],
      data: {}
    }
  }

  componentDidMount () {
    console.log('index.js page loaded')
    this.setState({ loading: false })
  }

  render () {
    if (this.state.loading) {
      return (
        <main>
          Just a second...
          <Stylesheet sheet={sheet} />
        </main>
      )
    } else if (this.state.error) {
      return (
        <main>
          <h1>That""s bad. The following error occurred:</h1>
          <div className='error'>{this.state.error}</div>
          <Stylesheet sheet={sheet} />
        </main>
      )
    }


    return (
      <HashRouter>
        <div>
          <App />
          <Stylesheet sheet={sheet} />
        </div>
      </HashRouter>
    )
  }
}

export default Index
