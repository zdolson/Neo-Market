import React, { Component } from 'react'

import {Stylesheet} from '../components/stylesheet.js'
import sheet from '../components/base.scss'

import RightSideBar from '../components/rightSideBar/rightSideBar.js'
import LeftSideBar from '../components/leftSideBar/leftSideBar.js'
import LeftAccountBar from '../components/leftAccountBar/leftAccountBar.js'
import RightAccountBar from '../components/rightAccountBar/rightAccountBar.js'
import TopBar from '../components/topBar/topBar.js'

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      error: '',

      data: {}
    }
  }

  componentDidMount () {
    console.debug('Loaded')
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
      <main>
        <TopBar />
        <LeftSideBar />
        <RightSideBar />
        <LeftAccountBar />
        <RightAccountBar />
        <Stylesheet sheet={sheet} />
      </main>
    )
  }
}

export default Index
