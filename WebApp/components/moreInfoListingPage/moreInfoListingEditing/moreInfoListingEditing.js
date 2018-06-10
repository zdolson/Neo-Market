import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './moreInfoListingEditing.scss'

import {updateItemPhoto} from '../../fireBaseFunctions.js'
import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'

import { Route } from 'react-router-dom'

import cF from '../../../neonFunctions/contractFunctions'
import * as firebase from 'firebase'


class MoreInfoListingEditing extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      imgUrl: '',
      file: null,
      imgRef: this.props.item.imageRef,
      imgLoad: false,
      tryAgain: true,
      description: this.props.item.description,
      title: this.props.item.title,
      price: this.props.item.price
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.submitHandler(e);
    }
  }

  readFile = (event) => {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imgRef: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  descChange = (e) => {
    this.setState( {description: e.target.value} );
  }

  titleChange = (e) => {
    this.setState( {title: e.target.value} );
  }

  priceChange = (e) => {
    this.setState( {price: e.target.value} );
  }

  submitHandler = () => {
    var that = this;
    var currentUser = firebase.auth().currentUser.uid;
    updateItemPhoto(this.state.file, this.props.item.id).then(imgRef => {
      cF.editPost(this.props.item.id, currentUser, this.state.title, this.state.description, this.state.price, this.props.item.amount, imgRef, this.props.item.isPurchased);
    });
  }

  render() {
    let { toggle_edit, item, tryAgain, addCartItem, removeItem } = this.props;
    let img = (
      this.state.imgLoad ?
        <img src={this.state.imgUrl} alt='loading...' width="350"/> :
        <div className="imgLoading"> <div>loading...</div> </div>
    );
    return (
      <div className="moreInfoListingEditing">

        <div className="moreInfoListingEditingTop">
          <div className="cancelEditing" onClick={this.props.toggle_edit}>
            Cancel
          </div>
          <div className="submitEditing" onClick={this.submitHandler}>
            <Route render={({ history}) => (
                <button type='button' className="whiteText" onClick={() => { history.push('/') }}>
                  Submit
                </button>
              )}
            />
          </div>
        </div>

        <div className="moreInfoListingEditingBottom">
          <div className="bottomLeft">
            <div className="editImage">
              <div className="image">
                <img src={this.state.imgRef} alt='loading...' width="350"/> :
              </div>
              <div className="upload">
                <ImportPhotoIcon />
                <input type="file" name="file" onChange={(event)=> { this.readFile(event) }} onClick={(event)=> { event.target.value = null }} />
              </div>
            </div>
            <div className="editDescription">
              <textarea rows="10" className="descInput" type="text" value={this.state.description} onChange={this.descChange} />
            </div>
          </div>
          <div className="bottomRight">
            <div className="editTitle">
              <div className="title">
                Title
              </div>
              <textarea rows="2" className="inputTitle" value={this.state.title} onChange={this.titleChange}/>
            </div>
            <div className="editPrice">
              <div className="price">
                Price
              </div>
              <textarea rows="1" className="inputPrice" value={this.state.price} onChange={this.priceChange}/>
            </div>
          </div>
        </div>

        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default MoreInfoListingEditing;
