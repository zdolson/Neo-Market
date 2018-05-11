import { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './register.scss'

import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'
import {registerUserToDatabase} from '../../fireBaseFunctions.js'

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
      file: null
    };
    this.registerHandler = this.registerHandler.bind(this);
    this.readFile = this.readFile.bind(this);
  }

  registerHandler = () => {
    // console.log(this.state.imgRef);
    // console.log(this.state.file);
    // if(this.state.imgRef != null && this.state.imgRef.files.length > 0) {
    //   console.log(this.state.imgRef.files[0]);
    // }
    registerUserToDatabase(this.state.fullName, this.state.userName, this.state.email, this.state.file, this.state.password, this.state.verifyPassword, this.state.wif)
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