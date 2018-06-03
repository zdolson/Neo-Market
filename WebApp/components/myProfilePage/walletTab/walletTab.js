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
      imgRef: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal = () => {
    this.setState({modal_is_open: true});
  }

  closeModal = () => {
    this.setState({modal_is_open: false});
  }

  componentWillMount = () => {
    firebase.database().ref('/Users/'+firebase.auth().currentUser.uid).once('value').then(snapshot => {
      let {fullName, userName, wif, photoId} = snapshot.val();
      if(photoId == 'defaultPhoto.png') photoId = defaultPhoto;
      this.setState( {full_name: fullName, user_name: userName, wif: wif, imgRef: photoId} );
    }).catch(err => {
      console.error(err);
    });
  }

  readFile = (e) => {
    let file = e.target.files[0];
    console.log('readFile');
    updateUserPhoto(file).then(imgRef => {
      this.setState({ imgRef: imgRef });
    }).catch(err => {
      console.error(err);
    });
  }

  render () {
    console.log('imgRef: '+this.state.imgRef);
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
              <div>{this.state.full_name}</div>
            </div>
            <div className="email">
              <div>email: </div>
              <div>{firebase.auth().currentUser.email}</div>
            </div>
            <div className="address">
              <div>ADDRESS GOES HERE: </div>
              <div> </div>
            </div>
            <div className="wifForm">
              <div className="wifInput">
                ........
              </div>
              <div className="wifButton" onClick={this.openModal}>
                change
              </div>
            </div>
          </div>
        </div>

        <WifModal modal_is_open={this.state.modal_is_open} closeModal={this.closeModal} handleSubmit={this.handleSubmit}/>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default WalletTab;
