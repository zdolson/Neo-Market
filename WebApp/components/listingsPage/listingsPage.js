import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listingsPage.scss'
import Listing from '../listing/listing.js'

// Import for react-router package.
import { Route, NavLink, Link, BrowserRouter } from "react-router-dom";


/**

@ Alec

@ 2/27/18

@ Purpose: Container providing dynamic spacing and sizing of the listings grid

TODO: do we need to add props logic?

@ Nicholas

@ Updated 03/08/2018

@ Purpose: Updated the listing items to be linked with a hard-coded URL. Will need to change this later to
           have actual logic.

**/

export class ListingsPage extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
    }
  }

  render () {
    console.log(this.props.state);
    var items = this.props.state.items;
    var cartItems = this.props.state.cartItems;
    var selectedItem = this.props.state.selectedItem;
    return (
      <div className='listings'>

        {items.map( (item, key) => {
          // console.log(item);
          var link = '/MoreInfoItem/'+item.id;
          console.log(link);
          return (
            <Link to={link} key={key} className="navLink">  <Listing item={item}/> </Link>
          )
        })}

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingsPage;
