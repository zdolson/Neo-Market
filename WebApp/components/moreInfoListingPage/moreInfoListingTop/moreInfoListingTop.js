import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './moreInfoListingTop.scss'
import { NavLink } from 'react-router-dom'

import MoreInfoListingBackBtn from './moreInfoListingBackBtn/moreInfoListingBackBtn.js'
import EditIcon from '../../assets/Feedbin-Icon-home-edit.svg'

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
    return (
      <div className='moreInfoListingTop'>
        <NavLink className="navLinkBackBtn" to="/"> <MoreInfoListingBackBtn /> </NavLink>
        <div className="editBtn" onClick={this.props.toggle_edit}> <EditIcon/> </div>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingTop
