import { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './register.scss'

import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'
import {registerUserToDatabase} from '../../fireBaseFunctions.js'
import cF from '../../../neonFunctions/contractFunctions'
// import sha256

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      fullName: '',
      email: '',
      password: '',
      verifyPassword: '',
      wif: '',
      imgRef: null,
      file: null,
      registerError: false,
      registerErrorMessage: 'Passwords must be at least 6 characters long and have at least one special character and number'
    };
    this.registerHandler = this.registerHandler.bind(this);
    this.readFile = this.readFile.bind(this);
    this.checkPasswordFields = this.checkPasswordFields.bind(this);
  }

  checkPasswordFields = () => {
    // Checking to see if the passwords match
    if (this.state.password == this.state.verifyPassword) {
      var specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/
      var numberCharRegex = /\d/
      // Checking to see if the password meets the proper requirement
      if (this.state.password.length >= 6 && specialCharRegex.exec(this.state.password) != null && numberCharRegex.exec(this.state.password) != null) {
        return true
      } else {
        this.setState({
          registerError: true,
          registerErrorMessage: 'Your password does not meet the proper requiremnts. Check that your password has at least 6 characters with one special character and one number'
        })
      }
    } else {
      this.setState({
        registerError: true,
        registerErrorMessage: 'Your passwords do not match, please verify that both your passwords are the same.'
      })
    }
    return false
  }

  registerHandler = () => {
    var fields_array = [this.state.fullName, this.state.userName, this.state.email, this.state.file, this.state.password, this.state.verifyPassword, this.state.wif];
    // Make a field array to use to quickly check for fields that have no inputs
    if(fields_array.indexOf('') == -1) {
      if (this.checkPasswordFields()) {
        this.setState({
          registerError: false,
          registerErrorMessage: 'Attempting to Register User...'
        })
        registerUserToDatabase(this.state.fullName, this.state.userName, this.state.email, this.state.file, cF.sha256(this.state.password), cF.sha256(this.state.verifyPassword), this.state.wif, this).then(uid => {
            // console.log(uid);
            var text = "";
            var possible = "0123456789";

            for (var i = 0; i < 6; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

            cF.register(uid, text);
        })
      }
    } else {
      this.setState({
        registerError: true,
        registerErrorMessage: 'Please fill in all fields properly'
      })
    }
  }

  readFile = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log('readFile');
    reader.onloadend = () => {
      this.setState({
        file: file,
        imgRef: reader.result
      });
    }
    reader.readAsDataURL(file)
  }

  /* text input handlers */
  updateUserName = (e) => {
    this.setState({ userName: e.target.value });
  }
  updateFullName = (e) => {
    this.setState({ fullName: e.target.value });
  }
  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  }
  updateVerifyPassword = (e) => {
    this.setState({ verifyPassword: e.target.value });
  }
  updateWif = (e) => {
    this.setState({ wif: e.target.value });
  }

  render () {

    let img = this.state.imgRef != null ?
      <img src={this.state.imgRef} width="250"/> :
      <div className="imgDefault"> <div>upload image</div> </div>

    const registerMessage = this.state.registerError ? (
      <div className="registerErrorMessage">
        {this.state.registerErrorMessage}
      </div>
    ) : (
      <div className="registerMessage">
        {this.state.registerErrorMessage}
      </div>
    )

    return (
      <div>
        <div className="registerPageContainer">
          <div className="leftSideRegisterPage">
            <div className="registerFormContainer">

              <div className="userNameContainer">
                <input className="userNameInput" value={this.state.userName} onChange={ (e) => this.updateUserName(e) } type="text" placeholder="Your User Name"/>
              </div>

              <div className="fullNameContainer">
                <input className="fullNameInput" value={this.state.fullName} onChange={ (e) => this.updateFullName(e) } type="text" placeholder="Your Full Name"/>
              </div>

              <div className="emailNameContainer">
                <input className="emailNameInput" value={this.state.email} onChange={ (e) => this.updateEmail(e) } type="text" placeholder="Your email"/>
              </div>

              <div className="passwordNameContainer">
                <input className="passwordNameInput" value={this.state.password} onChange={ (e) => this.updatePassword(e) } type="password" placeholder="Your password"/>
              </div>

              <div className="verifyPasswordNameContainer">
                <input className="verifyPasswordNameInput" value={this.state.verifyPassword} onChange={ (e) => this.updateVerifyPassword(e) } type="password" placeholder="Verify password"/>
              </div>

              <div className="importWalletContainer">
                <input className="walletInput" value={this.state.wif} onChange={ (e) => this.updateWif(e) } type="password" placeholder="Import WIF"/>
              </div>

              <div className="registerButtonContainer">
                <div className="registerPageButton" onClick={this.registerHandler}>
                  <div className="registerButtonText">
                    Register
                  </div>
                </div>
              </div>

              {registerMessage}

            </div>
          </div>

          <div className="rightSideRegisterPage">
            <div className="importProfilePictureContainer">
              <div className="profilePictureCaption">
                Profile Picture
              </div>

              <div className="importPhotoIconContainer">
                <div className="file-input-wrapper">
                  <ImportPhotoIcon/>
                  <input type="file" name="file" onChange={(e) => {this.readFile(e)}} onClick={(event)=> { event.target.value = null }} />
                </div>
              </div>

              <div className="photoContainer">
                {img}
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
