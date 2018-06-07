import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './makePost.scss'

import MakePostFormNew from './makePostForm/makePostFormNew.js'

export class MakePost extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    var useFirebaseBackend = this.props.useFirebaseBackend;
    var addMyListing = this.props.addMyListing;
    var addToNonPurchasedItems = this.props.addToNonPurchasedItems;

    return (
      <div className = "makePost">
        <MakePostFormNew useFirebaseBackend={useFirebaseBackend} addMyListing={addMyListing} addToNonPurchasedItems={addToNonPurchasedItems}/>
        <Stylesheet sheet={sheet} />
      </div>

    )
  }
}

export default MakePost
