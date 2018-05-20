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
    var addItem = this.props.addItem;
    var useFirebaseBackend = this.props.useFirebaseBackend;
    var addMyListing = this.props.addMyListing;

    return (
      <div className = "makePost">
        <MakePostFormNew addItem={addItem} useFirebaseBackend={useFirebaseBackend} addMyListing={addMyListing}/>
        <Stylesheet sheet={sheet} />
      </div>

    )
  }
}

export default MakePost
