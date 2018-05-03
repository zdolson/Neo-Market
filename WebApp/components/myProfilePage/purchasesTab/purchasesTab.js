import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './purchasesTab.scss'

class PurchasesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        purchasesTab
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default PurchasesTab;
