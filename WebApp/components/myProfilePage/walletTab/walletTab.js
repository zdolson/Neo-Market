import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './walletTab.scss'

class WalletTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div className="walletTab">

        <div className="walletTop">
          walletTop
        </div>

        <div className="walletBottom">
          walletBottom
        </div>

        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default WalletTab;
