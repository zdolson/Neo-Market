import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPage.scss'

import Modal from 'react-responsive-modal'

import CheckOutTableItems from './checkOutTableItems/checkOutTableItems.js'
import TotalPurchase from './totalPurchase/totalPurchase.js'
import CheckOutPageTotalValue from './checkOutPageTotalValue/checkOutPageTotalValue.js'

/**

@ Nicholas

@ Date: 03/06/18

Purpose: Component that holds all of the components that is the checkOutPage.

**/

export class CheckOutPage extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      openModal: false,
      password: ''
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  openModal() {
    console.log("openModal()");
    this.setState({openModal: true});
  }

  closeModal() {
    console.log("closeModal()");
    this.setState({openModal: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("handleSubmit(): hey zach");
  }

  handleChange(event) {
    console.log("handleChange()");
    this.setState({password: event.target.value});
  }

  render () {
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID
    var removeCartItem = this.props.removeCartItem
    var sumTotalCartItems = this.props.sumTotalCartItems
    var tryAgain = this.props.tryAgain

    const { openModal } = this.state;

    return (
      <div className="checkOutPage">

        <div className="header">
          <div> Cart </div>
          <div className="cartHeaderLine"></div>
        </div>

        {this.props.cartItems.map( (id, key) => {
          var currCheckOutItem = returnCheckOutDataByID(id)
          return (
            <CheckOutTableItems tryAgain={tryAgain} currCheckOutItem={currCheckOutItem} removeCartItem={removeCartItem}/>
          )
        })}

        <div className="checkOutBottom">
          <div className="checkOutDetails">
            <div className="checkOutTotalWrapper">
              <div className="checkOutTotal"> Total </div>
              <div className="totalSpace"></div>
              <div className="checkOutTotalValue"> {sumTotalCartItems()} </div>
            </div>
            <div className="checkOutTotalLine"></div>
          </div>
          <div className="purchaseBtn" onClick={this.openModal}>
            <div className="purchaseBtnText"> Purchase </div>
          </div>
        </div>

        <Modal open={openModal} onClose={this.closeModal} little>
          <div className="modalText">
            <h1>4 beers</h1>
            <h2>3 double shots</h2>
            <h3>2 amfs</h3>
            <h4><i>sidewalk</i></h4>
            <form onSubmit={this.handleSubmit}>
              <label>
                <div className="passwordLabel"> password: </div>
                <div className="passwordInput"> <input type="text" value={this.state.password} onChange={this.handleChange} /> </div>
              </label>
              <div className="submitButton"> <input type="submit" value="Submit" /> </div>
            </form>
          </div>
        </Modal>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default CheckOutPage
