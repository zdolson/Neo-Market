import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './walletTab.scss'

import ImportPhotoIcon from '../../assets/ImportPhotoIcon.svg'

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
                photo
              </div>
              <div className="name">
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
            walletForm
          </div>
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default WalletTab;
