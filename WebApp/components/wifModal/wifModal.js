import React, { Component } from 'react'
import {Stylesheet} from '../stylesheet.js'
import sheet from './wifModal.scss'

import Modal from 'react-responsive-modal'

import * as firebase from 'firebase'

class WifModal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      password: '',
      loading: false
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
    this.setState({loading: true});
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(firebase.auth().currentUser.email, this.state.password).then(val => {
      console.log(val);
      this.setState({loading: false});
      this.props.closeModal();
      alert('purchase completed.');
    }).catch(err => {
      console.error(err);
      this.setState({loading: false});
      alert(err.message);
    });
  }

  render () {
    let {closeModal, modal_is_open} = this.props;
    return (
      <Modal open={modal_is_open} onClose={closeModal} little>
        {this.state.loading ? (
          <div className="loading">loading...</div>
        ) : (
          <div className="modalText">
            <h1>Confirm password!</h1>
            <form className="wif-form" onSubmit={this.handleSubmit}>
              <label>
                <div className="passwordInput"> <input type="password" value={this.state.password} onChange={this.handleChange} placeholder="password..."/> </div>
              </label>
              <input className="submitButton" type="submit" value="Submit" />
            </form>
          </div>
        )}
        <Stylesheet sheet={sheet}/>
      </Modal>
    );
  }
}

export default WifModal;
