import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './walletTab.scss'

import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'
import ProfilePhoto from '../../assets/DSC_0046.jpg'

class WalletTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
                name
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
              name
            </div>
            <div className="email">
              email
            </div>
            <div className="address">
              address
            </div>
            <div className="wifForm">
              <div className="wifInput">
                wifInput
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
