import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './purchasedItem.scss'

import {pullingDatabaseImage} from '../../../fireBaseFunctions.js'

/**

@ Victoria

@ 04/30/18

Purpose: Component for creating each item in the purchases page

**/

class PurchasedItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      imgUrl: 'defaultURL',
      imgLoad: false,
      tryAgain: true
    }
  }

  render () {
    let {item} = this.props;
    pullingDatabaseImage(item.id, this.state.imgUrl, this.state.imgLoad, this.state.tryAgain, this);
    // pullingDatabaseImage(item.id, this.state.imgUrl, this.state.imgLoad, this.state.tryAgain, this);
    var img = (
      this.state.imgLoad ?
      <img src={this.state.imgUrl} alt='loading...' height="50"/> :
      <div className="imgLoading"> <div>loading...</div> </div>
    );
    return (
      <div className='item-container'>

        <div className="item-top">
          <div className="item-image">
            <div>{img}</div>
          </div>
          <div className="item-title">
            {item.title}
          </div>
        </div>

        <div className="item-price">
           <div className="price"> {item.price} </div>
           <div className="neo"> NEO </div>
        </div>

        <div className="item-bottom">
          <div className="item-description">
            {item.description}
          </div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PurchasedItem
