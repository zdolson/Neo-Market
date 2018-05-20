import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './listingsTab.scss'

import Listing from '../../listingsPage/listing/listing.js'

import { Link } from "react-router-dom";

class ListingsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    var items = this.props.state.items;
    var cartItems = this.props.state.cartItems;
    var tryAgain = this.props.tryAgain;
    var myListings = this.props.state.myListings;
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID;
    
    // Taking the myListings param passed in from app, goes through 
    // the list and gets the item information corresponding to listingID.
    var listingsList = []
    for(var i = 0; i < myListings.length; i++) {
      var currListing = returnCheckOutDataByID(myListings[i])
      listingsList.push(currListing)
    }

    return (
      <div className='listings'>
        {listingsList.map( (item, key) => {
          var link = '/MoreInfoItem/'+item.id;
          return (
            <Link to={link} key={key} className="navLink">  <Listing item={item} tryAgain={tryAgain}/> </Link>
          )
        })}

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingsTab;
