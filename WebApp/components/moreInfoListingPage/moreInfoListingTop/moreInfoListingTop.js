import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './moreInfoListingTop.scss'
import { NavLink } from 'react-router-dom'

import MoreInfoListingBackBtn from './moreInfoListingBackBtn/moreInfoListingBackBtn.js'
import EditIcon from '../../assets/Feedbin-Icon-home-edit.svg'

import * as firebase from 'firebase'

/**

@ Alec

@ 3/09/18

Purpose: Component for spacing of top of moreInfoListingPage

**/

class MoreInfoListingTop extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    let owner = this.props.owner;
    let edit = owner == firebase.auth().currentUser.uid ? (
        <div className="editBtn" onClick={this.props.toggle_edit}> <EditIcon/> </div>
      ) : (
        <div></div>
      );
    return (
      <div className='moreInfoListingTop'>
        <NavLink className="navLinkBackBtn" to="/"> <MoreInfoListingBackBtn /> </NavLink>
        {edit}
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingTop
