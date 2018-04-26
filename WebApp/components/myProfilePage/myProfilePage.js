import { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './myProfilePage.scss'

import ListingsTab from './listingsTab/listingsTab.js'
import PurchasesTab from './purchasesTab/purchasesTab.js'
import WalletTab from './walletTab/walletTab.js'

class MyProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 0,
      tabs: [
        ListingsTab,
        PurchasesTab,
        WalletTab
      ]
    };
    this.handleListing = this.handleListings.bind(this);
    this.handlePurchases = this.handlePurchases.bind(this);
    this.handleWallet = this.handleWallet.bind(this);
  }

  handleListings = () => {
    console.log('handleListings()');
    this.setState( {tabSelected: 0} );
  }

  handlePurchases = () => {
    console.log('handlePurchases()');
    this.setState( {tabSelected: 1} );
  }

  handleWallet = () => {
    console.log('handleWallet()');
    this.setState( {tabSelected: 2} );
  }

  render () {
    let Tab = this.state.tabs[this.state.tabSelected];
    return (
      <div className="main-container">
        <div className="tabs-container">
          <div onClick={this.handleListings}>one</div>
          <div onClick={this.handlePurchases}>two</div>
          <div onClick={this.handleWallet}>three</div>
        </div>
        <Tab />
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default MyProfilePage;
