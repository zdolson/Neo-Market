import { Component } from 'react'

import Register from './register/register.js'
import LogoIcon from '../assets/Logo.svg'
import LoginButton from '../assets/LoginButton.svg'
import {Stylesheet} from '../stylesheet.js'
import sheet from './loginRegister.scss'
import BlockchainBackground from '../assets/blockchain.png'

import * as firebase from 'firebase'

import { loginUser } from '../fireBaseFunctions.js'
import cF from '../../neonFunctions/contractFunctions'

class LoginRegister extends Component {
    constructor(props) {
      super(props);
      this.state = {
        register: false,
        loginErrorMessage: 'Please input your account information',
        loginError: false
      };
      this.registerHandler = this.registerHandler.bind(this);
      this.loginHandler = this.loginHandler.bind(this);
    }

    handleKeyPress = (e) => {
      if(e.key === 'Enter') {
        this.loginHandler();
      }
    }

    registerHandler = () => {
      // console.log("registerHandler()");
      this.setState( {register: true} );
    }

    loginHandler = () => {
      loginUser(this.loginName.value, cF.sha256(this.password.value), this).then((user) => {
        // if a user is return from the firebase login function, then the user was auth correctly.
        if (user) {
          this.props.navToApp();
        }
      })
    }

    render () {
      const loginMessage = this.state.loginError ? (
        <div className="errorMessage">
          {this.state.loginErrorMessage}
        </div>
      ) : (
        <div className="loginMessage">
          {this.state.loginErrorMessage}
        </div>
      )

      let style = {
        rightSide: {
          backgroundImage: `url(${BlockchainBackground})`
        }
      }

      const page = this.state.register ? (
        <Register navToApp={this.props.navToApp}/>
      ) : (
        <main>
          <div className="wholeContainer">
            <div className="leftSide">
              <div className="logo">
                <LogoIcon/>
              </div>

              <div className="informationContainer">
                <div className="welcomeText">
                  Welcome!
                </div>
                <div className="informationText">
                  Founded in the winter of 2018 by a group of 6 UCSC students for their senior design project, Neo-Market aims to create
                  a new market in the cryptocurrency, blockchain world. Here we want to provide a domain where individuals can use their
                  Neo cryptocurrency freely, wether its to purchase, or to sell items. 
                </div>
                <div className="buttonContainer">
                  <div className="registerButton" onClick={this.registerHandler}>
                    <div className="registerButtonText">
                      Register
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={style.rightSide} className="rightSide">
              <div className="formContainer">
                <div className="captionBox">
                  Or Log into your account
                </div>
                <div className="loginName">
                  <input className="loginNameInput" type ="text" ref={(ref) => { this.loginName = ref; }} placeholder="Email" onKeyPress={this.handleKeyPress}/>
                </div>

                <div className="inputPasswordField">
                  <input className="passwordInput" type ="password" ref={(ref) => { this.password = ref; }} placeholder="Password" onKeyPress={this.handleKeyPress}/>
                </div>

                <div className="loginButton" onClick={this.loginHandler}>
                  <LoginButton className="loginSVG"/>
                </div>
                {loginMessage}
              </div>
            </div>
          </div>
        </main>
      )

      return (
        <main>
          {page}
          <Stylesheet sheet={sheet} />
        </main>
      )
    }
}

export default LoginRegister;
