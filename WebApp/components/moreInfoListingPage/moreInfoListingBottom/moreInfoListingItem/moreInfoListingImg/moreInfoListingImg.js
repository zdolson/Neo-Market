import React, { Component } from 'react'
import { Stylesheet } from '../../../../stylesheet.js'
import sheet from './moreInfoListingImg.scss'

import * as firebase from 'firebase'

/**

@ Alec

@ 3/09/18

Purpose: img that for moreInfoPage

**/

class MoreInfoListingImg extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      imgUrl: '',
      imgLoad: false
    }
  }

  componentWillMount() {
    var ref = firebase.storage().ref(this.props.imageName);
    ref.getDownloadURL().then(url => {
      this.setState({ imgUrl: url, imgLoad: true });
    }).catch(err => {
      console.error(err)
    });
  }

  render () {
    var img = (
      this.state.imgLoad ?
      <img src={this.state.imgUrl} alt='loading...' width="350"/> :
      <div className="imgLoading"> <div>loading...</div> </div>
    );
    return (
      <div className='moreInfoListingImg'>
        {img}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingImg
