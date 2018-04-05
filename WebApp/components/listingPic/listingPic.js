import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './listingPic.scss'

import { pullingDatabaseImage } from '../fireBaseFunctions.js'

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
      imgUrl: 'defaultURL',
      imgLoad: false
    }
  }

  componentWillMount() {
    firebase.database().ref('/ListingImages/').once('value').then(function(snapshot) {
      var keys = Object.keys(snapshot.val())
      for(var i=0; i<keys.length;i++){
        if(this.props.id == keys[i]){
          var ref = firebase.storage().ref(snapshot.child(this.props.id).val());
          ref.getDownloadURL().then(url => {
            this.setState({ imgUrl: url, imgLoad: true });
          }).catch(err => {
            console.error(err)
          });
        }
      }
    }).catch(err => {
      console.error(err)
    });

    //pullingDatabaseImage(this.props.id, this.state.imgUrl, this.state.imgLoad, this.props.tryAgain)
  }
  

  render () {
    if(this.props.tryAgain && !this.state.imgLoad){
      firebase.database().ref('/ListingImages/').once('value').then(function(snapshot) {
        var keys = Object.keys(snapshot.val())
        for(var i=0; i<keys.length;i++){
          if(this.props.id == keys[i]){
            var ref = firebase.storage().ref(snapshot.child(this.props.id).val());
            ref.getDownloadURL().then(url => {
              this.setState({ imgUrl: url, imgLoad: true });
            }).catch(err => {
              console.error(err)
            });
          }
        }
      }.bind(this)).catch(err => {
        console.error(err)
        this.setState({tryAgain: false})
      });
    }

    //pullingDatabaseImage(this.props.id, this.state.imgUrl, this.state.imgLoad, this.props.tryAgain)
    

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
