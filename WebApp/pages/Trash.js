import React, { Component } from 'react'

import {Stylesheet} from '../components/stylesheet.js'
import sheet from '../components/base.scss'

// Import for framework components
import RightSideBar from '../components/rightSideBar/rightSideBar.js'
import LeftSideBar from '../components/leftSideBar/leftSideBar.js'
import LeftAccountBar from '../components/leftAccountBar/leftAccountBar.js'
import RightAccountBar from '../components/rightAccountBar/rightAccountBar.js'
import TopBar from '../components/topBar/topBar.js'
import FilterDropdown from '../components/filterDropdown/filterDropdown.js'

// Imports for the individual page components
import ListingsPage from '../components/listingsPage/listingsPage.js'
import MakePost from '../components/makePost/makePost.js';
import WalletPage from '../components/walletPage/walletPage.js';
import TrashPage from '../components/trashPage/trashPage.js';
import ForumsPage from '../components/forumsPage/forumsPage.js';
import PromosPage from '../components/promosPage/promosPage.js';
import PurchasesPage from '../components/purchasesPage/purchasesPage.js';
import PeoplePage from '../components/peoplePage/peoplePage.js';
import CheckOutPage from '../components/checkOutPage/checkOutPage.js';
import MoreInfoListing from '../components/moreInfoListing/moreInfoListing.js';

// Import for react-router package.
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

/**

@ Nicholas

@ 03/04/2018

Purpose: Trash page component to allow for navigation to the posts page. 

**/

export class Trash extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      error: '',

      data: {}
    }
  }

  componentDidMount () {
    console.debug('Trash.js page loaded')
    this.setState({ loading: false })
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
        <Router>
          <div className="routingPaths">

            <FilterDropdown />
            <TopBar />
            <LeftSideBar />
            <RightSideBar />
            <LeftAccountBar />
            <RightAccountBar />

            <Route exact path="/" component={ListingsPage}/>
            <Route path="/Listings" component={ListingsPage}/>
            <Route path="/Posts" component={MakePost} />
            <Route path="/Wallet" component={WalletPage} />
            <Route path="/Trash" component={TrashPage} />
            <Route path="/Promos" component={PromosPage} />
            <Route path="/Purchases" component={PurchasesPage} />
            <Route path="/People" component={PeoplePage} />
            <Route path="/CheckOut" component={CheckOutPage} />
            <Route path="/moreInfoItem" component={MoreInfoListing} />
            
          </div>
        </Router>
      </main>
    )
  }
}

export default Trash
