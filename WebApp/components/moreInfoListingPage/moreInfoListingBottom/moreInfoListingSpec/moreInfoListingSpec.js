import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './moreInfoListingSpec.scss'

import ItemSpecsLine from '../../../assets/ItemSpecsLine.svg'
import Star from '../../../assets/Star.svg'
import { Route } from 'react-router-dom'

import cF from '../../../../neonFunctions/contractFunctions'
import { deletePosting, addCartItemToDatabaseField } from '../../../fireBaseFunctions.js'
import * as firebase from 'firebase'

/**

@ Alec/Nicholas

@ 3/09/18

Purpose: Specifications of the item, as well as passing in props to dynamically populate each listing Item

**/

class MoreInfoListingSpec extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      owner: 'loading...'
    }
    this.removeItemHandler = this.removeItemHandler.bind(this);
    this.addItemHandler = this.addItemHandler.bind(this);
  }

  componentDidMount = () => {
    if(this.props.useFirebaseBackend) {
      this.setState({ owner: this.props.item.owner });
    } else {
      firebase.database().ref('/Users/'+this.props.item.owner).once('value').then(snapshot => {
        this.setState({ owner: snapshot.val().userName });
      });
    }
  }

  removeItemHandler = () => {
    var that = this;
    if (this.props.useFirebaseBackend) {
      console.log('using firebase deletePost logic')
      deletePosting(this.props.item['id'], that).then(function() {
        that.props.removeItem(that.props.item['id'])
        that.props.removeMyListing(that.props.item['id'])
      });
    } else {
      console.log('backend deletePosting logic goes here')
      cF.deletePost(firebase.auth().currentUser.uid, this.props.item['id'])
      // make this thenable and add facade code
    }
  }

  addItemHandler = () => {
    var that = this;
    addCartItemToDatabaseField(this.props.item['id'], that).then(function(was_added) {
      if(was_added) that.props.addCartItem(that.props.item['id']);
    });
  }

  render () {
    let item = this.props.item;
    let owner = item.owner;
    let currentUser = firebase.auth().currentUser.uid;
    let itemID = item['id'];
    let addCartItem = this.props.addCartItem;
    let removeItem = this.props.removeItem;
    let currPrice = (Math.round((item.price * this.props.neoPrice) * 100) / 100);

    let btn = (owner == currentUser) ? (
      <Route render={({ history}) => (
        <button className='removeBtn' type='button' onClick={() => { this.removeItemHandler(); history.push('/') }}>
          Remove Item
        </button>
      )}/>
    ) : (
      <Route render={({ history}) => (
        <button className='cartBtn' type='button' onClick={() => { this.addItemHandler(); history.push('/') }}>
          Add to Cart
        </button>
      )}/>
    )

    return (
      <div className='moreInfoListingSpec'>
        <div className="titleAndPrice">
          <div className="title">
            {item['title']}
          </div>
          <div className="prices">
            <div className="neoPrice">{item['price']} NEO</div>
            <div className="usPrice">US price: {currPrice}</div>
          </div>
        </div>

        <div className="shippingDetails">
          <div className="shipsTo"> ships to blah </div>
          <div> 3-4 days </div>
        </div>

        <div className="sellerAndRating">
          <div className="seller">
            {this.state.owner}
          </div>
          <div className="rating">
            rating <Star />
          </div>
        </div>

        <div className="itemSpecsLine"> <ItemSpecsLine /> </div>

        <div className="btnContainer">
          {btn}
        </div>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}



export default MoreInfoListingSpec
