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

    const Tab = this.state.tabs[this.state.tabSelected];
    const styles = {
      selectedStyle = {
        background: 'none'
      },
      unselectedStyle = {}
    };
    let listingsStyle = purchasesStyle = walletStyle = unselectedStyle;
    if(this.state.tabSelected == 0) { listingsStyle = selectedStyle; }
    if(this.state.tabSelected == 1) { purchasesStyle = selectedStyle; }
    if(this.state.tabSelected == 2) { walletStyle = selectedStyle; }

    return (
      <div className="main-container">
        <div className="tabs-container">
          <div className ="tab" onClick={this.handleListings}>one</div>
          <div className ="tab" onClick={this.handlePurchases}>two</div>
          <div className ="tab" onClick={this.handleWallet}>three</div>
        </div>
        <Tab />
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default MyProfilePage;
