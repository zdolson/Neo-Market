import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './moreInfoListingEditing.scss'

import {pullingDatabaseImage} from '../../fireBaseFunctions.js'
import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'


class MoreInfoListingEditing extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      imgUrl: '',
      file: null,
      imgRef: null,
      imgLoad: false,
      description: this.props.item.description,
      title: this.props.item.title,
      price: this.props.item.price
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  componentDidMount() {
    var that = this
    pullingDatabaseImage(this.props.item.id, this.state.imgUrl, this.state.imgLoad, this.props.tryAgain, that);
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
    console.log('submitHandler()');
    console.log( {description: this.state.description, title: this.state.title, price: this.state.price} );
  }

  render() {

    let { toggle_edit, item, tryAgain, addCartItem, removeItem } = this.props;
    let img = (
      this.state.imgLoad ?
        <img src={this.state.imgUrl} alt='loading...' width="350"/> :
        <div className="imgLoading"> <div>loading...</div> </div>
    );
    img = (
      this.state.imgRef != null ?
        <img src={this.state.imgRef} alt='loading...' width="350"/> :
        img
    );

    return (
      <div className="moreInfoListingEditing">

        <div className="moreInfoListingEditingTop">
          <div className="cancelEditing" onClick={this.props.toggle_edit}>
            Cancel
          </div>
          <div className="submitEditing" onClick={this.submitHandler}>
            Submit
          </div>
        </div>

        <div className="moreInfoListingEditingBottom">
          <div className="bottomLeft">
            <div className="editImage">
              <div className="upload">
                <ImportPhotoIcon/>
                <input type="file" name="file" onChange={(event)=> { this.readFile(event) }} onClick={(event)=> { event.target.value = null }} />
              </div>
              <div className="image">
                {img}
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
