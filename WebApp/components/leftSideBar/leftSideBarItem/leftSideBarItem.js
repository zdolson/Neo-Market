import React, { Component } from 'react'
import {Stylesheet, Svg} from '../../stylesheet.js'
import item from './leftSideBarItem.scss'


import ListingsIcon from '../../assets/ListingsIcon.svg'
import MyPostsIcon from '../../assets/MyPostsIcon.svg'
import WalletIcon from '../../assets/WalletIcon.svg'

// Import for react-router package.
import { NavLink } from "react-router-dom";

/**

@ Alec

@ 2/20/18

@ Purpose: Allows for LeftSideBar component to pass in props determining contents of its items.
          Handles svg icon dynamic use.

**/

export class LeftSideBarItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {}
  }

  // Icon map for dynamic svg use
  components = {
    Wallet: WalletIcon,
    Listings: ListingsIcon,
    Posts: MyPostsIcon,
  };

  render () {

    const IconName = this.components[this.props.title.replace(/ /, "")]
    var title = "/" + this.props.title

    return (
      <div className="topContainer">
      <div className="navItem">
        <IconName className="itemIcon"/>
        <NavLink to={title}> {this.props.title} </NavLink>
      </div>
        <Stylesheet sheet={item} />
      </div>
    )

  }
}

export default LeftSideBarItem
