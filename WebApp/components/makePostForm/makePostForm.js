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

export class MakePostForm extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      // stuff goes here
    }
  }

  render () {
    const { data } = this.props
    console.debug('Data is ', data)
    return (
      <div className = "makePostFormFields">
      <div className="header">
        <label className="std text">Make A Post</label>
          <h3>     </h3>
      </div>
      <div className = "title">
      <label className="std text">
        <div className="label">title</div>
        <input type ="text" name="title" id="title_1" placeholder="you know what you do" gth = "32"/>
        </label>
      </div>
      <div className = "description">
          <label className="std text">
            <div className="label">description</div>
            <input type ="text" name="descr" id="descri_1" placeholder="plz describe your item" maxLength = "32"/>
            </label>
      </div>
      <div className = "loadImage">
      <label className="std text">
        <div className="label">load an image</div>
        <input type ="text" name="img" id="img_1" placeholder="upload w/ a filename" maxLength = "32"/>
        </label>
        <label className="std text">
          <div className="label">image should be loaded right here</div>
          <input type ="text" name="imgLoad" id="img_2" placeholder="if not, try a diff file type" maxLength = "32"/>
          </label>
      </div>
      <div className = "price">
      <label className="std text">
        <div className="label">how much it cost yo?</div>
        <input type ="text" name="price" id="price_1" placeholder="plz input Neo value" maxLength = "32"/>
        </label>
      </div>
      <div className = "sizeDim">
      <label className="std text">
        <div className="label">size / dimensions ~optional~</div>
        <input type ="text" name="size" id="size_1" placeholder="how big!" maxLength = "32"/>
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
