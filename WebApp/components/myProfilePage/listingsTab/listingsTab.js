import {Component} from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './listingsTab.scss'

import ListingsPage from '../../listingsPage/listingsPage.js'

class ListingsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {

    let state = this.props.state;
    let tryAgain = this.props.tryAgain;

    return (
      <div>
        <ListingsPage state={state} tryAgain={tryAgain}/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default ListingsTab;
