import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './walletTab.scss'
import * as firebase from 'firebase'

import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'
import ProfilePhoto from '../../assets/DSC_0046.jpg'
import WifModal from '../../wifModal/wifModal.js'



class WalletTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_is_open: false,
      user_name: '',
      full_name: '',
      wif: ''
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
      let {fullName, userName, wif} = snapshot.val();
      this.setState( {full_name: fullName, user_name: userName, wif: wif} );
    }).catch(err => {
      console.error(err);
    });
  }

  render () {
    return (
      <div className="walletTab">

        <div className="topBottomContainer">
          <div className="photoImportName">
            <div className="photoName">
              <div className="photo">
                <img src={ProfilePhoto} width="150" />
              </div>
              <div className="userName">
                {this.state.user_name}
              </div>
            </div>
            <div className="importIcon">
              <ImportPhotoIcon/>
            </div>
          </div>
        </div>

        <div className="topBottomContainer">
          <div className="walletForm">
            <div className="name">
              {this.state.full_name}
            </div>
            <div className="email">
              {firebase.auth().currentUser.email}
            </div>
            <div className="address">
              ADDRESS GOES HERE
            </div>
            <div className="wifForm">
              <div className="wifInput">
                {this.state.wif}
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
