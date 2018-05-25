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
    let {filter_price, search_string, items, nonPurchasedItems} = this.props.state;
    let {search, resetSearch} = this.props;
    items = items.filter((item) => search_string === '' || item.title.indexOf(search_string) !== -1 || item.description.indexOf(search_string) !== -1);
    if(filter_price == 0) {
      items = items.sort((a, b) => a.price-b.price);
    } else if(filter_price == 1) {
      items = items.sort((a, b) => b.price-a.price);
    }
    return (
      <div className='listings'>

        {nonPurchasedItems.map( (item, key) => {
          let last = false
          if(key == items.length-1) last=true;
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
