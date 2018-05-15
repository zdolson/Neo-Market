import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './wifModal.scss'

import Modal from 'react-responsive-modal'

import * as firebase from 'firebase'

class WifModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("handleChange()");
    this.setState({password: event.target.value});
  }



  handleSubmit(e) {
    console.log('handleSubmit()');
    e.preventDefault();
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(firebase.auth().currentUser.email, this.state.password).then(val => {
      console.log(val);
      this.props.closeModal();
      alert('purchase completed.');
    }).catch(err => {
      console.error(err);
      alert(err.message);
    });
  }

  render () {
    let {closeModal, modal_is_open} = this.props;
    return (
      <Modal open={modal_is_open} onClose={closeModal} little>
        <div className="modalText">
          <h1>Confirm password!</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div className="passwordInput"> <input type="text" value={this.state.password} onChange={this.handleChange} /> </div>
            </label>
            <div className="submitButton"> <input type="submit" value="Submit" /> </div>
          </form>
        </div>
        <Stylesheet sheet={sheet}/>
      </Modal>
    );
  }
}

export default WifModal;
