import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './makePost.scss'

import RightSideBar from '../rightSideBar/rightSideBar.js'
import LeftSideBar from '../leftSideBar/leftSideBar.js'
import LeftAccountBar from '../leftAccountBar/leftAccountBar.js'
import RightAccountBar from '../rightAccountBar/rightAccountBar.js'
import TopBar from '../topBar/topBar.js'
import FilterDropdown from '../filterDropdown/filterDropdown.js'

// Imports for the page components
import listingsPage from '../listingsPage/listingsPage.js'
import walletPage from '../walletPage/walletPage.js';
import trashPage from '../trashPage/trashPage.js';
import forumsPage from '../forumsPage/forumsPage.js';
import promosPage from '../promosPage/promosPage.js';
import purchasesPage from '../purchasesPage/purchasesPage.js';
import peoplePage from '../peoplePage/peoplePage.js';

export class makePost extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    const { data } = this.props
    console.debug('Data is ', data)
    return (
      <div>
        <h3> makePost </h3>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default makePost
