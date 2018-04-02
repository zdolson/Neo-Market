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

// Test Comment

// Test Comment 2

export class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      /// Dev Version ///
      items: [
        // {id: "add434njdwf7f73n", owner: "Alec Felt", title: "J's on my feet", description: "These shoes are Jordans homie.", price: 100, amount: 1},
        // {id: "87wddw877d7d7d89", owner: "Nicholas Cheung", title: "Chest Slingshot", description: "How much ya bench .com How much ya bench .com How much ya bench .com How much ya bench .com How much ya bench .com ", price: 20, amount: 1},
        // {id: "jnfekjnkjelfkajf", owner: "Victoria Tran", title: "Cracking the Coding Interview", description: "Whiteboarding all dayyy", price: 90, amount: 1},
        // {id: "fjawfiajofiaa;ieoj;i", owner: "David Liang", title: "Nuked OS", description: "Kill it with fire", price: 30, amount: 1},
        // {id: "sl501mx'[co3qa-]", owner: "Zachary Olson", title: "Honey D", description: "No honey all D", price: 900, amount: 1},
        // {id: "iaseodifjai2", owner: "Colin Dunn", title: "Overwatch", description: "Justice reins from above", price: 300, amount: 1}
      ],
      cartItems: [],//["add434njdwf7f73n", "sl501mx'[co3qa-]"]
      /// Production Version ///
      /*
      items: [],
      cartItems: []
      */
      tryAgain: false
    }
    this.addCartItem = this.addCartItem.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.returnCheckOutDataByID = this.returnCheckOutDataByID.bind(this);
    this.sumTotalCartItems = this.sumTotalCartItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.isIDInItemList = this.isIDInItemList.bind(this);
    this.itemsListToString = this.itemsListToString.bind(this);
    this.tryAgain = this.tryAgain.bind(this);
  }

  componentDidMount () {
    console.log('App component Loaded');
    console.log(this.state);
  }

  componentWillMount () {
    /// Production Version ///
    /*
      let listings = cF.accessStorage('tom');
      console.log(listings);
      this.setState({ items: listings });
    */
  }

  addCartItem(id) {
    this.setState({ cartItems: this.state.cartItems.concat(id) });
    // This isnt going to showup the first time, it will show up after the re-render.
  }

  addItem(id, owner, title, desc, price, amount) {
    /// Dev Version ///
    let newItem = {id: id, owner: owner, title: title, desc: desc, price: price, amount: amount};
    this.setState({ items: this.state.items.concat(newItem) })
    /// Production Version ///
    /*
      cF.createPost(id, owner, title, desc, price, amount);
    */
  }

  removeItem(id) {
    console.log("removeItem("+id+")");
    /// Dev Version ///

    //If the item is also in the cart then it will be removed as well. Else it will just keep going.
    this.removeCartItem(id)
    for (var i = 0; i < this.state.items.length; i++){
      var currItem = this.state.items[i]
      if (currItem['id'] == id) {
        this.state.items.splice(i, 1)
      }
      this.setState({ items: this.state.items});
    }
    /// Production Version ///
    /*
      let owner = ???
      cF.deletePost(owner, index);
    */
  }

  removeCartItem(id){
    console.log("removeCartItem("+id+")");
    var index = this.state.cartItems.indexOf(id)
    if(index != -1){
      this.state.cartItems.splice(index, 1)
      this.setState({ cartItems: this.state.cartItems})
    }else{
      console.log("item doesn't exist in cart")
    }
  }

  isIDInItemList(id) {
    this.itemsListToString()
    var itemList = this.state.items
    for (var i = 0; i < this.state.items.length; i++){
      if (itemList[i]['id'] == id) {
        return true
        break
      }
    }
    return false
  }

  returnCheckOutDataByID(id){
    var dict = this.state.items
    if (this.isIDInItemList(id) == true){
      for (let key in dict) {
        if (dict[key]['id'] == id) {
          var returnCartItem = dict[key]
          return returnCartItem
          break
        }
      }
    }
  }

  // Debugging method for toString
  itemsListToString(){
    for (var i = 0; i < this.state.items.length; i++){
      var currItem = this.state.items[i]
    }
  }

  sumTotalCartItems(){
    var currTotal = 0;
    for (var i = 0; i < this.state.cartItems.length; i++){
      var currCartItem = this.state.cartItems[i]
      var currCartItemData = this.returnCheckOutDataByID(currCartItem)
      if (currCartItemData == null) {
        break
      } else {
        currTotal = currTotal + currCartItemData['price']
      }
    }
    return currTotal
  }

  tryAgain() {
    this.setState({ tryAgain: false });
    this.setState({ tryAgain: true });
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
            <RightSideBar cartItems={this.state.cartItems} returnCheckOutDataByID={this.returnCheckOutDataByID} addCartItem={this.addCartItem} removeCartItem={this.removeCartItem} sumTotalCartItems={this.sumTotalCartItems}/>
            <LeftAccountBar />
            <RightAccountBar />
            <RoutingComponent state={this.state} tryAgain={this.tryAgain} addCartItem={this.addCartItem} returnCheckOutDataByID={this.returnCheckOutDataByID} removeCartItem={this.removeCartItem} sumTotalCartItems={this.sumTotalCartItems} addItem={this.addItem} removeItem={this.removeItem}/>
          </div>
        </main>
      )
    }
}

export default App
