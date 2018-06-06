import React, { Component } from 'react'

import {Stylesheet} from '../stylesheet.js'
import sheet from './app.scss'

// Import for framework components
import RightSideBar from '../rightSideBar/rightSideBar.js'
import LeftSideBar from '../leftSideBar/leftSideBar.js'
import LeftAccountBar from '../leftAccountBar/leftAccountBar.js'
import RightAccountBar from '../rightAccountBar/rightAccountBar.js'
import TopBar from '../topBar/topBar.js'
import RoutingComponent from '../routingComponent/routingComponent.js'

// Import for react-router package.
import { HashRouter as Router, Route, NavLink, Switch} from 'react-router-dom'

import cF from '../../neonFunctions/contractFunctions'

import * as firebase from 'firebase'

import { pullDataFromDatabase, pullUsersFromDatabase, getCartItemsFromDatabase, getMyListings, getMyPurchasesFromDatabase } from '../fireBaseFunctions.js'

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
      nonPurchasedItems: [],
      users: [
        {
          fullName: 'defaultfullName',
          userName: 'defualtUserName',
          email: 'defaultEmail',
          myListings: 'defaultMyListings',
          myPurchases: 'defaultMyPurchases',
          photoId: 'defaultPhotoId',
          password: 'defualtPassword',
          wif: 'defaultWif',
          myCartItems: 'defaultMyCartItems'
        }
      ],
      cartItems: [],
      loadItemsAgain:false,
      filter_price: 0,
      search_string: '',
      search: false,
      neoPrice: 0,
      myListings: [],
      myPurchases: []
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
    this.hasEdit = this.hasEdit.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.updateNeoPrice = this.updateNeoPrice.bind(this);
    this.addMyListing = this.addMyListing.bind(this);
    this.removeMyListing = this.removeMyListing.bind(this);
    this.resetCartItemState = this.resetCartItemState.bind(this);
    this.addToMyPurchases = this.addToMyPurchases.bind(this);
    this.removeItemFromNonPurchasedList = this.removeItemFromNonPurchasedList.bind(this);
  }

  componentDidMount() {
    if (this.props.useFirebaseBackend) {
      console.log('Pulling listings from firebase')
      pullDataFromDatabase(this)
      getCartItemsFromDatabase(this)
      getMyPurchasesFromDatabase(this)
      getMyListings(this)
    } else {
          console.log('Pulling listings from SC')
          cF.getAllPostsFromStorage(this).then(allPosts => {
            getCartItemsFromDatabase(this);
          }).catch(err => {
            console.error(err);
          });
    }
    this.updateNeoPrice();
  }

  addCartItem(id) {
    console.log('addCartItem: '+id);
    console.log('before: '+this.state.cartItems);
    console.log('after: '+this.state.cartItems.concat(id));
    this.setState({ cartItems: this.state.cartItems.concat(id) });
  }

  addItem(id, owner, title, desc, price, amount) {
    let newItem = {id: id, owner: owner, title: title, desc: desc, price: price, amount: amount};
    this.setState({ items: this.state.items.concat(newItem) })
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
  }

  removeCartItem(id){
    var index = this.state.cartItems.indexOf(id)
    if(index != -1){
      this.state.cartItems.splice(index, 1)
      this.setState({ cartItems: this.state.cartItems})
    }else{
      console.log("The item was not in the cart to be removed")
    }
  }

  addMyListing(id) {
    this.setState({ myListings: this.state.myListings.concat(id) })
  }

  addToMyPurchases(id) {
    this.setState({ myPurchases: this.state.myPurchases.concat(id) })
  }

  removeMyListing(id) {
    var index = this.state.myListings.indexOf(id)
    if(index != -1){
      this.state.myListings.splice(index, 1)
      this.setState({ myListings: this.state.myListings})
    }else{
      console.log("Could not find a myListing item to delete.")
    }
  }

  resetCartItemState() {
    this.setState({ cartItems: [] })
  }

  removeItemFromNonPurchasedList(id) {
    for (var i = 0; i < this.state.nonPurchasedItems.length; i++){
      var currItem = this.state.nonPurchasedItems[i]
      if (currItem['id'] == id) {
        this.state.nonPurchasedItems.splice(i, 1)
      }
      this.setState({ nonPurchasedItems: this.state.nonPurchasedItems});
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
      var currCartItem = this.state.cartItems[i];
      var currCartItemData = this.returnCheckOutDataByID(currCartItem)
      if (currCartItemData == null) {
        break
      } else {
        var currNum = currCartItemData['price']
        currNum = currNum.replace(/[^\x20-\x7E]/g, ''); // Needed to strip extra hidden ASCII values
        if (typeof currCartItemData['price'] !== 'number') {
          currNum = parseInt(currNum)
        }
        currTotal = currTotal + currNum
      }
    }
    return currTotal
  }

  updateFilter = (filter_price) => {
    if(filter_price !== this.state.filter_price) {
      this.setState( {filter_price: filter_price, search: true} );
    }
  }

  updateSearch = (search_string) => {
    if(search_string !== this.state.search_string) {
      this.setState( {search_string: search_string, search: true} );
    }
  }

  resetSearch = () => {
    this.setState( {search: false} );
  }

  hasEdit(id, description, title, price) {
    // This function is called when an update has been made to a listing.
    // Empty out the items list and then do another database pull
    this.setState({
      items: [
        {
          id: 'defaultValue',
          owner:'...',
          title: '...',
          description: '...',
          price: '0',
          amount: 0
        }
      ]
    })
    pullDataFromDatabase(this)
  }

  updateNeoPrice() {
    cF.getNeoUsPrice().then(result => {
      this.setState({neoPrice: result});
    }).catch(err => {
      console.error(err);
    });
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
          <TopBar updateFilter={this.updateFilter} updateSearch={this.updateSearch}/>
          <LeftSideBar />
          <RightSideBar
            cartItems={this.state.cartItems}
            returnCheckOutDataByID={this.returnCheckOutDataByID}
            addCartItem={this.addCartItem}
            removeCartItem={this.removeCartItem}
            sumTotalCartItems={this.sumTotalCartItems}/>
          <LeftAccountBar />
          <RightAccountBar cartItems={this.state.cartItems}/>
          <RoutingComponent
            neoPrice={this.state.neoPrice}
            resetSearch={this.resetSearch}
            state={this.state}
            addCartItem={this.addCartItem}
            returnCheckOutDataByID={this.returnCheckOutDataByID}
            removeCartItem={this.removeCartItem}
            sumTotalCartItems={this.sumTotalCartItems}
            addItem={this.addItem}
            removeItem={this.removeItem}
            hasEdit={this.hasEdit}
            useFirebaseBackend={this.props.useFirebaseBackend}
            addMyListing = {this.addMyListing}
            removeMyListing = {this.removeMyListing}
            resetCartItemState = {this.resetCartItemState}
            addToMyPurchases = {this.addToMyPurchases}
            removeItemFromNonPurchasedList = {this.removeItemFromNonPurchasedList}
          />
        </div>
      </main>
    )
  }
}

export default App;
