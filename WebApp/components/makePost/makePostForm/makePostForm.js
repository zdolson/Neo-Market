import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './makePostForm.scss'

import * as firebase from 'firebase'
import { pullDataFromDatabase, postNewPostingToDatabase } from '../../fireBaseFunctions.js'

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
    ev.preventDefault();
    // var file = this.uploadInput.files[0];
    var file = this.uploadInput.files[0];
    console.log(this.title.value);
    console.log(this.description.value);
    console.log(this.price.value);
    console.log(file);
    this.setState({ img: file, imgUpload: true });
    // cF.createPost('tom',this.title.value,this.description.value,parseInt(this.price.value),1)
    // var id = this.makeId();
    //
    //
    // var ref = firebase.storage().ref().child(id);
    // ref.put(file).then(function(snapshot) {
    //   console.log('Uploaded a blob or file!');
    // });
  }

  render () {
    const { data } = this.props
    console.debug('Data is ', data)
    return (
      <div className = "makePostFormFields">
        <form onSubmit={this.makePost}>
        <div className="header">
          Make a Post
        </div>
        <div className="label">title</div>
        <div className = "title form-group">
          <label className="std text">
            <input className="form-control" type ="text" ref={(ref) => { this.title = ref; }} name="title" id="title_1" placeholder="..." gth = "32"/>
          </label>
        </div>
        <div className = "description form-group">
          <label className="std text">
            <div className="label">description</div>
            <input className="form-control" type ="text" ref={(ref) => { this.description = ref; }} name="descr" id="descri_1" placeholder="..." maxLength = "32"/>
          </label>
        </div>
        <div className = "loadImage form-group">
          <label className="std text">
            <div className="label">load an image</div>
            <input className="form-control" type ="text" name="img" id="img_1" placeholder="upload w/ a filename" maxLength = "32"/>
          </label>
          <label className="std text">
            <div className="label">image should be loaded right here</div>
            <div className="uploadContainer">
              <div className="form-group">
                <input className="form-image"  ref={(ref) => { this.uploadInput = ref; }} type="file" />
              </div>

              <div className="form-group">
                <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
              </div>

            </div>
          </label>
        </div>
        <div className = "price form-group">
          <label className="std text">
            <div className="label">NEO Price</div>
            <input className="form-control" type ="text" ref={(ref) => { this.price = ref; }} name="price" id="price_1" placeholder="..." maxLength = "32"/>
          </label>
        </div>
        <input className="postBtn" type="submit" value="Submit" />
        </form>
        <Stylesheet sheet={sheet} />
      </div>

    )
  }
}

export default MakePostForm
