import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './checkOutPage.scss'

import Modal from 'react-responsive-modal'

import CheckOutTableItems from './checkOutTableItems/checkOutTableItems.js'
import TotalPurchase from './totalPurchase/totalPurchase.js'
import CheckOutPageTotalValue from './checkOutPageTotalValue/checkOutPageTotalValue.js'
import cF from '../../../backend/contractFunctions'

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
    this.helperReferenceFunctionForZach = this.helperReferenceFunctionForZach.bind(this)
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

  // Zach this is a little refernce for how to interact with  the cartItems
  helperReferenceFunctionForZach(cartItems, users, returnCheckOutDataByID){
    console.log('>>>>>>>>> TOP HELPER FUNCTION >>>>>>>>>>>>')
    if (cartItems.length != 0) {
      console.log(cartItems)
      console.log(cartItems.length)

      // This function returns information about the cartItem when passed in the cartitem id.
      console.log(returnCheckOutDataByID(cartItems[0]))

      var currCartItem = returnCheckOutDataByID(cartItems[0])
      console.log(currCartItem['id'])
      console.log(currCartItem['owner'])
      console.log(currCartItem['title'])
      console.log(currCartItem['description'])
      console.log(currCartItem['price'])
      console.log(currCartItem['amount'])

      console.log(users)
      var userOne = users[0]
      console.log(userOne)
      console.log(userOne['wif'])
      console.log(userOne['email'])
      console.log(userOne['fistName'])
      console.log(userOne['lastName'])
      console.log(userOne['password'])
      console.log(userOne['userName'])
    }
    console.log('>>>>>>>>> BOTTOM HELPER FUNCTION >>>>>>>>>>>>')
  }


  render () {
    var returnCheckOutDataByID = this.props.returnCheckOutDataByID
    var removeCartItem = this.props.removeCartItem
    var sumTotalCartItems = this.props.sumTotalCartItems
    var tryAgain = this.props.tryAgain
    var cartItems = this.props.cartItems
    var users = this.props.users

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

        {this.helperReferenceFunctionForZach(cartItems, users, returnCheckOutDataByID)}

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
