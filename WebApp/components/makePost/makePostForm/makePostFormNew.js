import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './makePostFormNew.scss'

import RightSideBar from '../../rightSideBar/rightSideBar.js'
import LeftSideBar from '../../leftSideBar/leftSideBar.js'
import LeftAccountBar from '../../leftAccountBar/leftAccountBar.js'
import RightAccountBar from '../../rightAccountBar/rightAccountBar.js'
import TopBar from '../../topBar/topBar.js'
import FilterDropdown from '../../filterDropdown/filterDropdown.js'

// Imports for the page components
import listingsPage from '../../listingsPage/listingsPage.js'
import walletPage from '../../walletPage/walletPage.js';
import trashPage from '../../trashPage/trashPage.js';
import forumsPage from '../../forumsPage/forumsPage.js';
import promosPage from '../../promosPage/promosPage.js';
import purchasesPage from '../../purchasesPage/purchasesPage.js';
import peoplePage from '../../peoplePage/peoplePage.js';
// import cF from '../../../../backend/contractFunctions'

import { NavLink } from 'react-router-dom'

import * as firebase from 'firebase'

export class MakePostForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      img: '',
      imgUpload: false
    }
    this.makeId = this.makeId.bind(this);
    this.makePost = this.makePost.bind(this);
    console.log(this.props);
  }

  makeId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  makePost(ev) {
    console.log("makePost");
    ev.preventDefault();
    // var file = this.uploadInput.files[0];
    var file = this.uploadInput.files[0];
    console.log(this.title.value);
    console.log(this.desc.value);
    console.log(this.price.value);
    console.log(this.amount.value);
    console.log(file);
    var id = this.makeId();

    /* Implement check for valid user input */
    var ref = firebase.storage().ref().child(id);
    ref.put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
      this.props.tryAgain();
    });

    /// Dev Version ///
    this.props.addItem(id, 'Neo-Market-Core', this.title.value, this.desc.value, this.price.value, this.amount.value );
    /// Production Version ///
    /*
      cF.createPost('tom',this.title.value,this.description.value,parseInt(this.price.value),1)
    */
  }

  render () {
    return (

      <div className="makePostFormWrapper">

        <div className="makePostFormHeader">
          Make a post
        </div>

        <form className="makePostFormFields" onSubmit={this.makePost}>

          <div className="makePostFormTitle form-group">
            <div className="bubbleTitle">
              title
            </div>
            <div className="inputWrapper"> <input className="form-control" ref={(ref) => { this.title = ref; }} type="text" placeholder="..."/> </div>
          </div>

          <div className="makePostFormDesc form-group">
            <div className="bubbleTitle">
              description
            </div>
            <div className="inputWrapper"> <input className="form-control" ref={(ref) => { this.desc = ref; }} type="text" placeholder="..."/> </div>
          </div>

          <div className="makePostFormImg form-group">
            <div className="bubbleTitle">
              image upload
            </div>
            <div className="inputWrapper"> <input className="form-image" ref={(ref) => { this.uploadInput = ref; }} type="file" /> </div>
          </div>

          <div className="makePostFormPrice form-group">
            <div className="bubbleTitle">
              price (NEO)
            </div>
            <div className="inputWrapper"> <input className="form-control" ref={(ref) => { this.price = ref; }} type="text" placeholder="..."/> </div>
          </div>

          <div className="makePostFormAmount form-group">
            <div className="bubbleTitle">
              amount
            </div>
            <div className="inputWrapper"> <input className="form-control" ref={(ref) => { this.amount = ref; }} type="text" placeholder="..."/> </div>
          </div>

          <div className="makePostFormBtn form-group">
              <div className="inputWrapper">
                  <div className="submitBtn" onClick={this.makePost}>
                      <NavLink className="navLinkSubmitBtn" to="/">
                          submit
                      </NavLink>
                  </div>
              </div>
          </div>

        </form>

        <Stylesheet sheet={sheet}/>
      </div>

    )
  }

}

export default MakePostForm
