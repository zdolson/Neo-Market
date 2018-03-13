import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './moreInfoListingTop.scss'
import MoreInfoListingBackBtn from './moreInfoListingBackBtn/moreInfoListingBackBtn.js'
import { NavLink } from 'react-router-dom'

/**

@ Alec

@ 3/09/18

Purpose: Component for spacing of top of moreInfoListingPage

**/

class MoreInfoListingTop extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='moreInfoListingTop'>
        <NavLink className="navLinkBackBtn" to="/"> <MoreInfoListingBackBtn /> </NavLink>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingTop
