import React, { Component } from 'react'
import {Stylesheet} from '../../../../../stylesheet.js'
import sheet from './checkOutPageAddr.scss'

import * as firebase from 'firebase'
/**

@ Nicholas

@ Date: 03/06/18

Purpose: Component to hold the logic for getting addresses

**/

export class CheckOutPageAddr extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      owner: 'loading...'
    }
  }

  componentDidMount = () => {
    firebase.database().ref('Users/'+this.props.currCheckOutItemOwner).once('value').then(user => {
      this.setState({ owner: user.val().userName });
    }).catch(err => {
      console.error(err);
      this.setState({ owner: 'unknown' });
    })
  }

  render () {

    return (
      <div className='checkOutPageAddr'>
        {this.state.owner}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPageAddr
