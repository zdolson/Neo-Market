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

    let state = this.props.state;
    let tryAgain = this.props.tryAgain;

    const Tab = this.state.tabs[this.state.tabSelected];

    const styles = {
      selectedStyle: {
        background: 'none',
        border: 'none'
      },
      unselectedStyle: {}
    };
    let listingsStyle = styles.unselectedStyle; let purchasesStyle = styles.unselectedStyle; let walletStyle = styles.unselectedStyle;
    if(this.state.tabSelected == 0) { listingsStyle = styles.selectedStyle; }
    if(this.state.tabSelected == 1) { purchasesStyle = styles.selectedStyle; }
    if(this.state.tabSelected == 2) { walletStyle = styles.selectedStyle; }

    return (
      <div className="main-container">
        <div className="tabs-container">
          <div style={listingsStyle} className ="tab" onClick={this.handleListings}>Active Postings</div>
          <div style={purchasesStyle} className ="tab" onClick={this.handlePurchases}>My Purchases</div>
          <div style={walletStyle} className ="tab" onClick={this.handleWallet}>Wallet Info</div>
        </div>
        { this.state.tabSelected == 0 ? <Tab state={state} tryAgain={tryAgain}/> : <Tab/> }
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default MyProfilePage;
