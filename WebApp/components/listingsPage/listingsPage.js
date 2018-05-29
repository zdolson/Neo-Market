import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listingsPage.scss'
import Listing from './listing/listing.js'
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
      items: []
    }

  }

  render () {
    let {filter_price, search_string, nonPurchasedItems} = this.props.state;
    let {resetSearch} = this.props;
    let search = this.props.state.search;
    let search_regEx = new RegExp(search_string, 'i');
    nonPurchasedItems = nonPurchasedItems.filter((item) => search_string === '' || search_regEx.test(item.title) || search_regEx.test(item.description));
    if(filter_price == 0) {
      nonPurchasedItems = nonPurchasedItems.sort((a, b) => a.price-b.price);
    } else if(filter_price == 1) {
      nonPurchasedItems = nonPurchasedItems.sort((a, b) => b.price-a.price);
    }
    return (
      <div className='listings'>

        {nonPurchasedItems.map( (item, key) => {
          let last = false
          if(key == nonPurchasedItems.length-1) last=true;
          var link = '/MoreInfoItem/'+item.id;
          return (
            <div key={key}>
              <div></div>
              <Link to={link} key={key} className="navLink">  <Listing item={item} search_string={search_string} resetSearch={resetSearch} last={last} search={search}/> </Link>
            </div>
          )
        })}

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingsPage;
