import React, { Component } from 'react'
import { Stylesheet } from '../../../stylesheet.js'
import sheet from './moreInfoListingBackBtn.scss'
import BackArrow from '../../../assets/BackArrow.svg'

/**

@ Alec

@ 3/09/18

Purpose: Button to go back to listings while in moreInfoListingPage

**/

class MoreInfoListingBackBtn extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='moreInfoListingBackBtn'>
        <BackArrow />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingBackBtn
