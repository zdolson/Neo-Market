import { Component } from 'react'

import Register from './register/register.js'
import LogoIcon from '../assets/Logo.svg'
import LoginButton from '../assets/LoginButton.svg'
import {Stylesheet} from '../stylesheet.js'
import sheet from './loginRegister.scss'

import * as firebase from 'firebase'

import { loginUser } from '../fireBaseFunctions.js'
import cF from '../../neonFunctions/contractFunctions'

class LoginRegister extends Component {
    constructor(props) {
      super(props);
      this.state = {
        register: false
      };
      this.registerHandler = this.registerHandler.bind(this);
      this.loginHandler = this.loginHandler.bind(this);
    }

    registerHandler = () => {
      // console.log("registerHandler()");
      this.setState( {register: true} );
    }

    loginHandler = () => {
      loginUser(this.loginName.value, cF.sha256(this.password.value)).then((user) => {
        // if a user is return from the firebase login function, then the user was auth correctly.
        if (user) {
          this.props.navToApp();
        }
      })
    }

    render () {
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
                  HelloWorld! This defines the default size of an element before the remaining space is distributed.
                  It can be a length (e.g. 20%, 5rem, etc.) or a keyword. The auto keyword means "look at my width or
                  height property" (which was temporarily done by the main-size keyword until deprecated). The content
                  keyword means "size it based on the item's content" - this keyword isn't well supported yet, so it's
                  hard to test and harder to know what its brethren max-content, min-content, and fit-content do.
                </div>
                <div className="buttonContainer">
                  <div className="registerButton" onClick={this.registerHandler}>
                    <div className="registerButtonText">
                      Register Button
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rightSide">
              <div className="formContainer">
                <div className="captionBox">
                  Or Log into your account
                </div>
                <div className="loginName">
                  <input className="loginNameInput" type ="text" ref={(ref) => { this.loginName = ref; }} placeholder="Login Name"/>
                </div>

                <div className="inputPasswordField">
                  <input className="passwordInput" type ="password" ref={(ref) => { this.password = ref; }} placeholder="Password"/>
                </div>

                <div className="loginButton" onClick={this.loginHandler}>
                  <LoginButton/>
                </div>
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
