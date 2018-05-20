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

// If you want have login capabilities, then comment this line out.
// This is to let dev's develop without having to constantly loging.
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
      cart: [],
      data: {},
      inApp: false,
      useFirebaseBackend: true
    }
    this.navToApp = this.navToApp.bind(this);
  }

  navToApp = () => {
    this.setState( {inApp: true} );
  }

  componentDidMount () {
    console.log('index.js page loaded');
    if(this.state.loading) this.setState({ loading: false });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({inApp: true});
      } else {
        this.setState({inApp: false});
      }
    });
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
            <App useFirebaseBackend={this.state.useFirebaseBackend}/>
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
