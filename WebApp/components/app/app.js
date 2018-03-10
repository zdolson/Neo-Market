import React, { Component } from 'react'

import {Stylesheet} from '../stylesheet.js'
import sheet from './app.scss'

// Import for framework components
import RightSideBar from '../rightSideBar/rightSideBar.js'
import LeftSideBar from '../leftSideBar/leftSideBar.js'
import LeftAccountBar from '../leftAccountBar/leftAccountBar.js'
import RightAccountBar from '../rightAccountBar/rightAccountBar.js'
import TopBar from '../topBar/topBar.js'
import FilterDropdown from '../filterDropdown/filterDropdown.js'
import RoutingComponent from '../routingComponent/routingComponent.js'

// Import for react-router package.
import { HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'

/**

@ Nicholas

@ 03/08/2018

Purpose: App component that encapsulates the whole application.

**/

export class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      items: [
        ["add434njdwf7f73n", "Alec Felt", "J's on my feet", "These shoes are Jordans homie.", "100",],
        ["87wddw877d7d7d89", "Nicholas Cheung", "Chest Slingshot", "How much ya bench .com", "20",],
        ["sl501mx'[co3qa-]", "Victoria Tran", "Cracking the Coding Interview", "Whiteboarding all dayyy", "90",]
      ],
      cartItems: ["add434njdwf7f73n", "sl501mx'[co3qa-]"],
      selectedItem: "add434njdwf7f73n"
    }
  }

  componentDidMount () {
    console.log('App component Loaded');
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
          <div>
            <FilterDropdown />
            <TopBar />
            <LeftSideBar />
            <RightSideBar cartItems={this.state.cartItems} />
            <LeftAccountBar />
            <RightAccountBar />
            <RoutingComponent state={this.state} />
          </div>
        </main>
      )
    }
}

export default App
