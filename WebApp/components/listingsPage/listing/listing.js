import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './listing.scss'


import ListingContent from './listingContent/listingContent.js'
import { pullingDatabaseImage } from '../../fireBaseFunctions.js'

import * as firebase from 'firebase'

/**

@ Alec

@ 2/27/18

Purpose: Spacing and style for a listing in the grid

TODO: Add props logic so parent component can determine content of the listing

**/

export class Listing extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      imgUrl: 'defaultURL',
      imgLoad: false,
      tryAgain: true
    }
    // this.getImage = this.getImage.bind(this);
  }

  componentDidMount = () => {
    // console.log('listing mounted');
    // var {item, search_string, resetSearch, search, last} = this.props;
    // let tryAgain, imgLoad;
    // if(search) { tryAgain=true; imgLoad=false; } else { tryAgain=this.state.tryAgain; imgLoad=this.state.imgLoad; }
    // pullingDatabaseImage(item.id, this.state.imgUrl, imgLoad, tryAgain, this);
    // if(last && search) resetSearch();
  }

  componentDidUpdate = () => {
    let {last, search, resetSearch} = this.props;
    if(last && search) resetSearch();
  }

  // getImage = (item) => {
  //   let ref = firebase.storage().ref(item.imageRef);
  //   console.log(ref);
  //   ref.getDownloadURL().then(url => {
  //     console.log(url);
  //     this.setState({ imgUrl: url, imgLoad: true, tryAgain: false });
  //   }).catch(err => {
  //     console.error(err);
  //     this.setState({ tryAgain: true });
  //   });
  // }

  render () {
    // var {item, search_string, resetSearch, search, last} = this.props;
    // let tryAgain, imgLoad;
    // if(search) { tryAgain=true; imgLoad=false; } else { tryAgain=this.state.tryAgain; imgLoad=this.state.imgLoad; }
    // // pullingDatabaseImage(item.id, this.state.imgUrl, imgLoad, tryAgain, this);
    // if(tryAgain && !imgLoad) this.getImage(item);
    // pullingDatabaseImage(item.id, this.state.imgUrl, this.state.imgLoad, this.state.tryAgain, this);

    let {item} = this.props;

    var img = (
      <img src={item.imageRef} alt='loading...' height="200"/>
    );

    return (
      <div className='listing'>
        <div className='listingPic'>
          {img}
        </div>
        <ListingContent item={item} />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default Listing;
