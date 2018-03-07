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
import listingsPage from '../components/listingsPage/listingsPage.js'
import makePost from '../components/makePost/makePost.js';
import walletPage from '../components/walletPage/walletPage.js';
import trashPage from '../components/trashPage/trashPage.js';
import forumsPage from '../components/forumsPage/forumsPage.js';
import promosPage from '../components/promosPage/promosPage.js';
import purchasesPage from '../components/purchasesPage/purchasesPage.js';
import peoplePage from '../components/peoplePage/peoplePage.js';
import checkOutPage from '../components/checkOutPage/checkOutPage.js';
import moreInfoListing from '../components/moreInfoListing/moreInfoListing.js';

// Import for react-router package.
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom'

/**

@ Nicholas

@ 03/04/2018

Purpose: Forums page component to allow for navigation to the posts page. 

**/

export class Forums extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      error: '',

      data: {}
    }
  }

  componentDidMount () {
    console.debug('Forums.js page loaded')
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

            <Route exact path="/" component={listingsPage}/>
            <Route path="/Listings" component={listingsPage}/>
            <Route path="/Posts" component={makePost} />
            <Route path="/Forums" component={forumsPage} />
            <Route path="/Wallet" component={walletPage} />
            <Route path="/Trash" component={trashPage} />
            <Route path="/Promos" component={promosPage} />
            <Route path="/Purchases" component={purchasesPage} />
            <Route path="/People" component={peoplePage} />
            <Route path="/CheckOut" component={checkOutPage} />
            <Route path="/moreInfoItem" component={moreInfoListing} />

          </div>
        </Router>
      </main>
    )
  }
}

export default Forums
