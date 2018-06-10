import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './walletTab.scss'
import * as firebase from 'firebase'
import {updateUserPhoto} from '../../fireBaseFunctions.js'

import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'
import ProfilePhoto from '../../assets/DSC_0046.jpg'
import WifModal from '../../wifModal/wifModal.js'

import defaultPhoto from '../../assets/defaultPhoto.png'

class WalletTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_is_open: false,
      user_name: '',
      full_name: '',
      wif: '',
      imgRef: false,
      public_address: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.wifChange = this.wifChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal = () => {
    this.setState({modal_is_open: true});
  }

  closeModal = () => {
    this.setState({modal_is_open: false});
  }

  wifChange = (e) => {
    this.setState({ wif: e.target.value });
  }

  handleSubmit = () => {
    console.log('handleSubmit');
    firebase.database().ref('/Users/'+firebase.auth().currentUser.uid).update({ wif: this.state.wif }).catch(err => {
      console.error(err);
    });
  }

  componentWillMount = () => {
    firebase.database().ref('/Users/'+firebase.auth().currentUser.uid).once('value').then(snapshot => {
      let {fullName, userName, wif, photoId, publicAddress} = snapshot.val();
      if(photoId == 'defaultPhoto.png') photoId = defaultPhoto;
      this.setState( {full_name: fullName, user_name: userName, wif: wif, imgRef: photoId, public_address: publicAddress} );
    }).catch(err => {
      console.error(err);
    });
  }

  readFile = (e) => {
    let file = e.target.files[0];
    console.log('readFile');
    updateUserPhoto(file).then(imgRef => {
      this.setState({
        imgRef: imgRef
      });
    }).catch(err => {
      console.error(err);
    });
  }

  render () {
    var Img =
      this.state.imgRef ?
        <img src={this.state.imgRef} alt='loading...' height="200"/>
      :
        <div className="imgLoading"> <div>loading...</div> </div>

    return (
      <div className="walletTab">

        <div className="topBottomContainer">
          <div className="photoImportName">
            <div className="photoName">
              <div className="photo">
                {Img}
              </div>
              <div className="userName">
                {this.state.user_name}
              </div>
            </div>
            <div className="importIcon">
              <ImportPhotoIcon/>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={ (e) => {this.readFile(e)} }
                onClick={ (event)=> { event.target.value = null } }
              />
            </div>
          </div>
        </div>

        <div className="topBottomContainer">
          <div className="walletForm">
            <div className="name">
              <div>name: </div>
              <div className="name_val">{this.state.full_name}</div>
            </div>
            <div className="email">
              <div>email: </div>
              <div className="email_val">{firebase.auth().currentUser.email}</div>
            </div>
            <div className="address">
              <div> public_address: </div>
              <div className="pub_address_val">{this.state.public_address}</div>
              <div className="pub_address_dots">...</div>
            </div>
            <div className="wifForm">
              <div className="wif_name"> <div>wif:</div> </div>
              <input type="password" className="wif_val" value={this.state.wif} onChange={e => this.wifChange(e)}/>
              <div className="wifButton" onClick={this.openModal}>
                update
              </div>
            </div>
          </div>
        </div>

        <WifModal modal_is_open={this.state.modal_is_open} closeModal={this.closeModal} verificationSuccess={this.handleSubmit}/>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default WalletTab;
