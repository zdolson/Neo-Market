import { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './register.scss'
import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.registerHandler = this.registerHandler.bind(this);
    this.importProfilePicture = this.importProfilePicture.bind(this);
  }

  registerHandler = () => {
    // console.log("registerHandler()");
    this.props.navToApp();
  }

  importProfilePicture = () => {
    console.log("Going to import image")

  }

  render () {
    return (
      <div>
        <div className="registerPageContainer">
          <div className="leftSideRegisterPage">
            <div className="registerFormContainer">
              <div className="userNameContainer">
                <input className="userNameInput" type="text" placeholder="Your User Name"/>
              </div>

              <div className="fullNameContainer">
                <input className="fullNameInput" type ="text" placeholder="Your Full Name"/>
              </div>

              <div className="emailNameContainer">
                <input className="emailNameInput" type ="text" placeholder="Your email"/>
              </div>

              <div className="passwordNameContainer">
                <input className="passwordNameInput" type ="password" placeholder="Your password"/>
              </div>

              <div className="verifyPasswordNameContainer">
                <input className="verifyPasswordNameInput" type ="password" placeholder="Verify password"/>
              </div>

              <div className="importWalletContainer">
                <input className="walletInput" type ="password" placeholder="Import WIF"/>
              </div>

              <div className="registerButtonContainer">
                <div className="registerPageButton" onClick={this.registerHandler}>
                  <div className="registerButtonText">
                    Register
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rightSideRegisterPage">
            <div className="importProfilePictureContainer">
              <div className="profilePictureCaption">
                Profile Picture
              </div>

              <div className="importPhotoIconContainer" onClick={this.importProfilePicture}>
                <ImportPhotoIcon/>
              </div>

            </div>
          </div>

        </div>
        <Stylesheet sheet={sheet} />
      </div>
    );
  }
}

export default Register;
