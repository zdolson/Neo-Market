import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './walletTab.scss'

import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'
import ProfilePhoto from '../../assets/DSC_0046.jpg'
import {pullUserData} from '../../fireBaseFunctions.js'

class WalletTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'user name',
      email: 'email',
      fullName: 'full name',
      wif: 'wif'
    };
  }

  componentDidMount = () => {
    pullUserData().then((userData) => {
      let {userName, email, fullName, wif} = userData;
      this.setState( {userName:userName, email:email, fullName:fullName, wif:wif} );
    }).catch((err) => {
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
                {this.state.userName}
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
              {this.state.fullName}
            </div>
            <div className="email">
              {this.state.email}
            </div>
            <div className="address">
              address
            </div>
            <div className="wifForm">
              <div className="wifInput">
                {this.state.wif}
              </div>
              <div className="wifButton">
                change
              </div>
            </div>
          </div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default WalletTab;
