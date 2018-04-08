import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './listingPic.scss'

import * as firebase from 'firebase'

/**

@ Alec

@ 2/27/18

Purpose: Reusable component for picture of a listing

TODO: props logic so parent Listing can dynamically assign picture

**/

class ListingPic extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      imgUrl: '',
      imgLoad: false
    }
  }

  componentWillMount() {
    var ref = firebase.storage().ref('doge.jpg');
    //var ref = firebase.storage().ref().child(this.props.id);
    ref.getDownloadURL().then(url => {
      console.log('image download successful: '+url)
      this.setState({ imgUrl: url, imgLoad: true });
    }).catch(err => {
      console.error(err)
    });

    // Dev Version
    // var ref = firebase.storage().ref().child(this.props.id);
    // ref.getDownloadURL().then(url => {
    //   console.log('image download successful: '+url)
    //   this.setState({ imgUrl: url });
    // }).catch(err => {
    //   console.error(err)
    // });
  }

  render () {
    if(this.props.tryAgain && !this.state.imgLoad){
      //var ref = firebase.storage().ref().child(this.props.id);
      var ref = firebase.storage().ref('doge.jpg');
      ref.getDownloadURL().then(url => {
        console.log('image download successful: '+url)
        this.setState({ imgUrl: url, imgLoad: true });
      }).catch(err => {
        console.error(err)
        this.setState({ tryAgain: false });
      });
    }
    var img = (
      this.state.imgLoad ?
      <img src={this.state.imgUrl} alt='loading...' width="350"/> :
      <div className="imgLoading"> <div>loading...</div> </div>
    );
    return (
      <div className='listingPic'>
        {img}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingPic
