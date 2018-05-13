import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './makePostFormNew.scss'

import { Route } from 'react-router-dom'
import * as firebase from 'firebase'
import { pullDataFromDatabase, postNewPostingToDatabase, postNewImageToStorageDatabase } from '../../fireBaseFunctions.js'
import cF from '../../../neonFunctions/contractFunctions'

export class MakePostForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      img: '',
      imgUpload: false
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
    var file = this.uploadInput.files[0];
    var id = this.makeId();

    var currentUser;
    var title = this.title.value;
    var description = this.description.value;
    var price = this.price.value;
    var amount = this.amount.value;
    firebase.database().ref('Users/'+firebase.auth().currentUser.uid).once('value')
      .then( (snapshot) => {
        currentUser = snapshot.val().userName;
        console.log(currentUser);
        console.log(title)
        console.log(description)
        console.log(price)
        console.log(amount)
        cF.createPost(id, currentUser, title, description, price, amount)
      }
    );

    // postNewPostingToDatabase(id, currentUser, this.title.value, this.description.value, this.price.value, this.amount.value, file)


    // /// Dev Version ///
    // this.props.addItem(id, 'Neo-Market-Core', this.title.value, this.desc.value, this.price.value, this.amount.value );
    // /// Production Version ///
    // /*
    //   cF.createPost('tom',this.title.value,this.description.value,parseInt(this.price.value),1)
    // */
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
            <div className="inputWrapper"> <input className="form-control" ref={(ref) => { this.description = ref; }} type="text" placeholder="..."/> </div>
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
                      <Route render={({ history}) => (
                          <button type='button' onClick={() => { history.push('/') }}>
                            Submit
                          </button>
                        )}/>
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
