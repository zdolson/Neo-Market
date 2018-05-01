import React, { Component } from 'react'

import {Stylesheet} from '../components/stylesheet.js'
import sheet from '../components/base.scss'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'

import App from '../components/app/app.js'
import LoginRegister from '../components/loginRegister/loginRegister.js'

// Firebase config
import {initializeApp, loginUser} from '../components/fireBaseFunctions.js'
import * as firebase from 'firebase'

initializeApp();

// Need authentication to allow access to database.
loginUser('nccheung@ucsc.edu', 'nccheung');

/**

@ Nicholas

@ 03/04/2018

Purpose: index page component to allow for navigation to the posts page.

**/

export class Index extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: true,
      error: '',
      cart: ['yolo', 'swag'],
      data: {},
      inApp: false
    }
    this.navToApp = this.navToApp.bind(this);
  }

  navToApp = () => {
    this.setState( {inApp: true} );
  }

  componentDidMount () {
    console.log('index.js page loaded');
    if(this.state.loading) this.setState({ loading: false });
    /*
      *** Attention Nick ***
        this is probably what we are going to want to use
        for routing once we have firebase auth hooked up
      *** Attention Nick ***
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
          // User is signed out.
        }
      });
    */
  }

  render () {
    if (this.state.loading) {
      return (
        <main>
          Just a second...
          <Stylesheet sheet={sheet} />
        </main>
      )
    } else if (this.state.error) {
      return (
        <main>
          <h1>That""s bad. The following error occurred:</h1>
          <div className='error'>{this.state.error}</div>
          <Stylesheet sheet={sheet} />
        </main>
      )
    }

    if(this.state.inApp) {
      return (
        <HashRouter>
          <div>
            <App />
            <Stylesheet sheet={sheet} />
          </div>
        </HashRouter>
      );
    } else {
      return (
        <div>
          <LoginRegister navToApp={this.navToApp}/>
          <Stylesheet sheet={sheet} />
        </div>
      )
    }
  }
}

export default Index
