import React from 'react'

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

const RoutingComponent = (state) => (
  <main>
    <Switch>
      <Route exact path="/" render={ () => <ListingsPage state={state.state}/> } />
      <Route path="/Listings" render={ () => <ListingsPage state={state.state}/> } />
      <Route path="/Posts" component={MakePost} />
      <Route path="/Forums" component={ForumsPage} />
      <Route path="/Wallet" component={WalletPage} />
      <Route path="/Trash" component={TrashPage} />
      <Route path="/Promos" component={PromosPage} />
      <Route path="/Purchases" component={PurchasesPage} />
      <Route path="/People" component={PeoplePage} />
      <Route path="/CheckOut" render={ () => <CheckOutPage cartItems={state.state.cartItems}/> } />
      {state.state.items.map( (item, key) => {
        var path="/MoreInfoItem/"+item.id;
        console.log(path)
        return (
          <Route path={path} render={ () => <MoreInfoListingPage cartItems={state.state.cartItems} items={state.state.items}/> } />
        )
      })}
  	</Switch>
  </main>
)

export default RoutingComponent
