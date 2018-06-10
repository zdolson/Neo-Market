import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './listingsTab.scss'

import Listing from '../../listingsPage/listing/listing.js'

import { Link } from "react-router-dom";

import cF from '../../../neonFunctions/contractFunctions.js'
import * as firebase from 'firebase'

class ListingsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listingsList: []
    };
  }

  componentDidMount = () => {
      var returnCheckOutDataByID = this.props.returnCheckOutDataByID;
      cF.getUserPostsFromStorage(firebase.auth().currentUser.uid).then(posts => {
          var myListings = posts;
          var listingsList = []
          for(var i = 0; i < myListings.length; i++) {
              // console.log(myListings[i].id);
            // var currListing = returnCheckOutDataByID(myListings[i].id)
            var currListing = myListings[i];
            // console.log('currListing: '+currListing);
            listingsList.push(currListing)
          }
          console.log('yolo');
          this.setState({ listingsList: listingsList });
      }).catch(err => {
          console.error(err);
      });
  }

  render () {
    var items = this.props.state.items;
    var cartItems = this.props.state.cartItems;
    var tryAgain = this.props.tryAgain;
    // var myListings = this.props.state.myListings;


    // Taking the myListings param passed in from app, goes through
    // the list and gets the item information corresponding to listingID.


    return (
      <div className='listings'>
        {this.state.listingsList.map( (item, key) => {
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
