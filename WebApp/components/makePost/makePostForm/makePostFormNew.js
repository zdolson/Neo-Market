import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './makePostFormNew.scss'

import { Route } from 'react-router-dom'
import * as firebase from 'firebase'
import { pullDataFromDatabase, postNewPostingToDatabase, postNewImageToStorageDatabase, postNewPostingToDatabaseDemo } from '../../fireBaseFunctions.js'
import cF from '../../../neonFunctions/contractFunctions'
import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'

export class MakePostForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      imgUrl: '',
      imgRef: null,
      imgLoad: false,
      file: null,
      // img: '',
      // imgUpload: false,
    }
    this.makeId = this.makeId.bind(this);
    this.makePost = this.makePost.bind(this);
  }

  makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  makePost(ev) {
    var file = this.state.file;
    var id = this.makeId();
    var currentUser;
    var title = this.title.value;
    var description = this.description.value;
    var price = this.price.value;
    var useFirebaseBackend = this.props.useFirebaseBackend
    var that = this;

    currentUser = firebase.auth().currentUser.uid;
    postNewPostingToDatabaseDemo(id, currentUser, title, description, price, '1', file, that).then(imageRef => {
        that.props.addMyListing(id);
        that.props.addToNonPurchasedItems(id, currentUser, title, description, price, '1', file);
        cF.createPost(id, currentUser, title, description, price, '1', imageRef, 'false')
    })
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

  render () {
    let img = (
      this.state.imgLoad ?
        <img src={this.state.imgUrl} alt='loading...' width="350"/> :
        <div className="imgLoading"> <div>No image has been uploaded</div> </div>
    );
    img = (
      this.state.imgRef != null ?
        <img src={this.state.imgRef} alt='loading...' width="350"/> :
        img
    );

    return (
      <div className="makePostFormWrapper">
        <div className="leftSideForm">
          <div className="inputFormContainer">
            <div className="titleNameContainer">
              <input className="titleNameInput" ref={(ref) => { this.title = ref; }} type="text" placeholder="Title"/>
            </div>

            <div className="priceContainer">
              <input className="priceInput" ref={(ref) => { this.price = ref; }} type="text" placeholder="Price"/>
            </div>

            <div className="descriptionContainer">
              <textarea rows="10" className="descriptionInput" type="text" ref={(ref) => { this.description = ref; }} placeholder="Description..." />
            </div>

            <div className="makePostButtonContainer">
              <Route render={({ history}) => (
                <button className="makePostButton" type='button' onClick={() => { this.makePost(); history.push('/') }}>
                  <div className="makePostButtonText">
                    Post
                  </div>
                </button>
              )}/>
            </div>
          </div>
        </div>

        <div className="rightSideForm">
          <div className="editImageContainer">
            <div className="editImage">
              <div className="image">
                {img}
              </div>
              <div className="upload">
                <ImportPhotoIcon/>
                <input type="file" name="file" onChange={(event)=> { this.readFile(event) }} onClick={(event)=> { event.target.value = null }} />
              </div>
            </div>
          </div>
        </div>
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }

}

export default MakePostForm
