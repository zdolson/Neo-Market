import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './makePostForm.scss'

import RightSideBar from '../rightSideBar/rightSideBar.js'
import LeftSideBar from '../leftSideBar/leftSideBar.js'
import LeftAccountBar from '../leftAccountBar/leftAccountBar.js'
import RightAccountBar from '../rightAccountBar/rightAccountBar.js'
import TopBar from '../topBar/topBar.js'
import FilterDropdown from '../filterDropdown/filterDropdown.js'

// Imports for the page components
import listingsPage from '../listingsPage/listingsPage.js'
import walletPage from '../walletPage/walletPage.js';
import trashPage from '../trashPage/trashPage.js';
import forumsPage from '../forumsPage/forumsPage.js';
import promosPage from '../promosPage/promosPage.js';
import purchasesPage from '../purchasesPage/purchasesPage.js';
import peoplePage from '../peoplePage/peoplePage.js';

import * as firebase from 'firebase'

export class MakePostForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.makeId = this.makeId.bind(this);
  }

  makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    var file = this.uploadInput.files[0];
    console.log(typeof file)
    console.log(file);


    var id = this.makeId();
    var ref = firebase.storage().ref().child(id);
    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });

    // axios.post('http://localhost:8000/upload', data)
    //   .then(function (response) {
    // this.setState({ imageURL: `http://localhost:8000/${body.file}`, uploadStatus: true });
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }

  render () {
    const { data } = this.props
    console.debug('Data is ', data)
    return (
      <div className = "makePostFormFields">
        <div className="header">
          Make a Post
        </div>
        <div className = "title">
          <label className="std text">
            <div className="label">title</div>
            <input type ="text" name="title" id="title_1" placeholder="..." gth = "32"/>
          </label>
        </div>
        <div className = "description">
          <label className="std text">
            <div className="label">description</div>
            <input type ="text" name="descr" id="descri_1" placeholder="..." maxLength = "32"/>
          </label>
        </div>
        <div className = "loadImage">
          <label className="std text">
            <div className="label">load an image</div>
            <input type ="text" name="img" id="img_1" placeholder="upload w/ a filename" maxLength = "32"/>
          </label>
          <label className="std text">
            <div className="label">image should be loaded right here</div>
            <div className="uploadContainer">
              <form onSubmit={this.handleUploadImage}>
                <div className="form-group">
                  <input className="form-image"  ref={(ref) => { this.uploadInput = ref; }} type="file" />
                </div>

                <div className="form-group">
                  <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
                </div>

                <input type="submit" value="Submit" />

              </form>
            </div>
          </label>
        </div>
        <div className = "price">
          <label className="std text">
            <div className="label">NEO Price</div>
            <input type ="text" name="price" id="price_1" placeholder="..." maxLength = "32"/>
          </label>
        </div>
        <div className = "postBtn">
          <label className="std text">
            <div className="label">POST</div>
          </label>
        </div>
        <Stylesheet sheet={sheet} />
      </div>

    )
  }
}

export default MakePostForm
