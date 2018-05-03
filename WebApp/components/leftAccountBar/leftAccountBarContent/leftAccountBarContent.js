import React, { Component } from 'react'
import {Stylesheet} from '../../stylesheet.js'
import sheet from './leftAccountBarContent.scss'

import DownArrowIcon from '../../assets/DownArrowIcon.svg'

import { NavLink } from "react-router-dom";

/**

@ Alec

@ 2/20/18

Purpose: LeftAccountBarContent; Fills the LeftAccountBar component with content

**/

export class LeftAccountBarContent extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  neoInteraction = () => {
    console.log("Put Neo functionality here!!!")
  }

  render () {
    return (
      <div className="leftAccountNavContent">
        <NavLink to='/Profile' className="profileText">
          My Profile
        </NavLink>
        <DownArrowIcon className="downArrowIcon"/>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default LeftAccountBarContent
