import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './listingsTab.scss'

class ListingsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div>
        listingsTab
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingsTab;
