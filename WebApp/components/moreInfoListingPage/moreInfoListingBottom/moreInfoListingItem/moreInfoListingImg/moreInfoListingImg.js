import React, { Component } from 'react'
import { Stylesheet } from '../../../../stylesheet.js'
import sheet from './moreInfoListingImg.scss'

import Grumpy from '../../../../assets/grumpy.svg'

/**

@ Alec

@ 3/09/18

Purpose: img that for moreInfoPage

**/

class MoreInfoListingImg extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  render () {
    return (
      <div className='moreInfoListingImg'>
        <Grumpy />
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default MoreInfoListingImg
