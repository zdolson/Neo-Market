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

  // {listingItems.map(item => {
  //   // console.log(item);
  //   var link = '/MoreInfoItem/'+item[0];
  //   // console.log(link);
  //   // <NavLink to={link} className="navLink">  <Listing item={item}/> </NavLink>
  // })}

  render () {
    var listingItems = this.props.listingItems;
    console.log(listingItems);
    console.log(this.props);
    return (
      <div className='listings'>

        <Link to='/MoreInfoItem' className="navLink">  <Listing/> </Link>
        <Link to='/MoreInfoItem' className="navLink">  <Listing/> </Link>
        <Link to='/MoreInfoItem' className="navLink">  <Listing/> </Link>
        <Link to='/MoreInfoItem' className="navLink">  <Listing/> </Link>
        <Stylesheet sheet={sheet} />

      </div>
    )
  }
}

export default ListingsPage;
