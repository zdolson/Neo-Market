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

import * as firebase from 'firebase'

import { pullDataFromDatabase, pullUsersFromDatabase } from '../fireBaseFunctions.js'

/**

@ Nicholas

@ 03/08/2018

Purpose: App component that encapsulates the whole application.

**/

export class App extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      /// Dev Version ///
      items: [
        {
          id: 'defaultValue', 
          owner:'...', 
          title: '...', 
          description: '...', 
          price: '0', 
          amount: 0
        }
      ],

      users: [
        {
          wif: 'defaultWif',
          email: 'defaultEmail',
          firstName: 'defaultFirstName',
          lastName: 'defaultLastName',
          password: 'defaultPassword',
          userName: 'defaultUserName'
        }
      ],
      cartItems: [],
      loadItemsAgain:false,
      tryAgain: false
    }

    // Function List
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

  componentWillMount () {
    /// Production Version ///
    /*
      let listings = cF.accessStorage('tom');
      console.log(listings);
      this.setState({ items: listings });
    */
    pullDataFromDatabase(this)
    pullUsersFromDatabase(this)
  }

  addCartItem(id) {
    this.setState({ cartItems: this.state.cartItems.concat(id) });
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
    var index = this.state.cartItems.indexOf(id)
    if(index != -1){
      this.state.cartItems.splice(index, 1)
      this.setState({ cartItems: this.state.cartItems})
    }else{
      console.log("item doesn't exist in cart")
    }
  }

  isIDInItemList(id) {
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

  // Debugging method toString to printout list
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
        var currNum = currCartItemData['price']
        if (typeof currCartItemData['price'] !== 'number') {
          currNum = parseInt(currNum)
        }
        currTotal = currTotal + currNum
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
