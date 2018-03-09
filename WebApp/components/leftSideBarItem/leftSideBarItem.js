import React, { Component } from 'react'
import {Stylesheet, Svg} from '../stylesheet.js'
import item from './leftSideBarItem.scss'

import ForumsIcon from '../assets/ForumsIcon.svg'
import ListingsIcon from '../assets/ListingsIcon.svg'
import MyPostsIcon from '../assets/MyPostsIcon.svg'
import PeopleIcon from '../assets/PeopleIcon.svg'
import PurchasesIcon from '../assets/PurchasesIcon.svg'
import TrashIcon from '../assets/TrashIcon.svg'
import WalletIcon from '../assets/WalletIcon.svg'
import PromosIcon from '../assets/PromosIcon.svg'

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
    this.State = {

    }
  }

  // Icon map for dynamic svg use
  components = {
    Forums: ForumsIcon,
    Listings: ListingsIcon,
    Posts: MyPostsIcon,
    People: PeopleIcon,
    Purchases: PurchasesIcon,
    Trash: TrashIcon,
    Wallet: WalletIcon,
    Promos: PromosIcon
  };

  render () {

    const IconName = this.components[this.props.title.replace(/ /, "")]
    var title = "/" + this.props.title

    return (
      <div className="navItem">
        <IconName className="itemIcon"/>
        <NavLink to={title}> {this.props.title} </NavLink>
        <Stylesheet sheet={item} />
      </div>
    )
    
  }
}

export default LeftSideBarItem
