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

const cF = require('../../../backend/contractFunctions')

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
        {id: "add434njdwf7f73n", owner: "Alec Felt", title: "J's on my feet", description: "These shoes are Jordans homie.", price: "100"},
        {id: "87wddw877d7d7d89", owner: "Nicholas Cheung", title: "Chest Slingshot", description: "How much ya bench .com How much ya bench .com How much ya bench .com How much ya bench .com How much ya bench .com ", price: "20"},
        {id: "jnfekjnkjelfkajf", owner: "Victoria Tran", title: "Cracking the Coding Interview", description: "Whiteboarding all dayyy", price: "90"},
        {id: "fjawfiajofiaa;ieoj;i", owner: "David Liang", title: "Nuked OS", description: "Kill it with fire", price: "30"},
        {id: "sl501mx'[co3qa-]", owner: "Zachary Olson", title: "Honey D", description: "No honey all D", price: "900"}
      ],
      cartItems: ["add434njdwf7f73n", "sl501mx'[co3qa-]", "jnfekjnkjelfkajf", "fjawfiajofiaa;ieoj;i"],
      selectedItem: "add434njdwf7f73n"
    }
    this.addCartItem = this.addCartItem.bind(this);
    this.returnCheckOutDataByID = this.returnCheckOutDataByID.bind(this);
  }

  componentDidMount () {
    console.log('App component Loaded');
  }

  componentWillMount () {
    // get all listings
    // let listings = cF.accessStorage('tom');
    // console.log(listings);
  }

  addCartItem(id) {
    this.setState({ cartItems: this.state.cartItems.concat(id) });
    // This isnt going to showup the first time, it will show up after the re-render.
  }

  returnCheckOutDataByID(id){
    var dict = this.state.items
    var returnCartItem = null
    for (let key in dict) {
      if (dict[key]['id'] == id) {
        returnCartItem = dict[key]
        break
      }
    }
    return returnCartItem
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
            <RightSideBar cartItems={this.state.cartItems} returnCheckOutDataByID={this.returnCheckOutDataByID}/>
            <LeftAccountBar />
            <RightAccountBar />
            <RoutingComponent state={this.state} addCartItem={this.addCartItem} returnCheckOutDataByID={this.returnCheckOutDataByID}/>
          </div>
        </main>
      )
    }
}

export default App
