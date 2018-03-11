import React, { Component } from 'react'

// Imports for the individual page components
import ListingsPage from '../listingsPage/listingsPage.js'
import MakePost from '../makePost/makePost.js';
import WalletPage from '../walletPage/walletPage.js';
import TrashPage from '../trashPage/trashPage.js';
import ForumsPage from '../forumsPage/forumsPage.js';
import PromosPage from '../promosPage/promosPage.js';
import PurchasesPage from '../purchasesPage/purchasesPage.js';
import PeoplePage from '../peoplePage/peoplePage.js';
import CheckOutPage from '../checkOutPage/checkOutPage.js';
import MoreInfoListingPage from '../moreInfoListingPage/moreInfoListingPage.js';

// Import for react-router package.
import { Switch, Route, hashHistory } from 'react-router-dom'

class RoutingComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    console.log(this.props);
  }

  render() {
    var state = this.props.state;
    var items = state.items;
    var cartItems = state.cartItems;
    var addCartItem = this.props.addCartItem;
    var addItem = this.props.addItem;
    return (
      <main>
        <Switch>
          <Route exact path="/" render={ () => <ListingsPage state={state}/> } />
          <Route path="/Listings" render={ () => <ListingsPage state={state}/> } />
          <Route path="/Post"  render={ () => <MakePost addItem={addItem}/> } />
          <Route path="/Forums" component={ForumsPage} />
          <Route path="/Wallet" component={WalletPage} />
          <Route path="/Trash" component={TrashPage} />
          <Route path="/Promos" component={PromosPage} />
          <Route path="/Purchases" component={PurchasesPage} />
          <Route path="/People" component={PeoplePage} />
          <Route path="/CheckOut" render={ () => <CheckOutPage cartItems={cartItems}/> } />
          {items.map( (item, key) => {
            var path="/MoreInfoItem/"+item.id;
            return (
              <Route path={path} key={key} render={ () => <MoreInfoListingPage addCartItem={addCartItem} item={items[key]} /> } />
            )
          })}
      	</Switch>
      </main>
    )
  }
}

export default RoutingComponent
