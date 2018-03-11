import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './moreInfoListingTop.scss'
import MoreInfoListingBackBtn from './moreInfoListingBackBtn/moreInfoListingBackBtn.js'

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
        <MoreInfoListingBackBtn />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingTop
