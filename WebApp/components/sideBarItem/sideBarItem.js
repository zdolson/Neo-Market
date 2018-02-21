import React, { Component } from 'react'
import Stylesheet from '../stylesheet.js'
import item from './sideBarItem.scss'

import ForumsIcon from '../assets/ForumsIcon.svg'
import ListingsIcon from '../assets/ListingsIcon.svg'
import MyPostsIcon from '../assets/MyPostsIcon.svg'
import PeopleIcon from '../assets/PeopleIcon.svg'
import PurchasesIcon from '../assets/PurchasesIcon.svg'
import TrashIcon from '../assets/TrashIcon.svg'
import WalletIcon from '../assets/WalletIcon.svg'
import PromosIcon from '../assets/PromosIcon.svg'

/**

@ Alec

@ 2/20/18

@ Purpose: Allows for SideBar component to pass in props determining contents of its items.

TODO: Fix logic for choosing <component>Icon.
      Currently, whichever Icon component is picked first is then used for all of the SideBarItem icons.
        (I have no idea why)

**/

export class SideBarItem extends Component {
  constructor(props, context) {
    super(props, context)
    this.State = {

    }
  }

  components = {
    Forums: ForumsIcon,
    Listings: ListingsIcon,
    MyPosts: MyPostsIcon,
    People: PeopleIcon,
    Purchases: PurchasesIcon,
    Trash: TrashIcon,
    Wallet: WalletIcon,
    Promos: PromosIcon
  };

  render () {
    const IconName = this.components[this.props.title.replace(/ /, "")]
    console.log("IconComponent: "+IconName)
    return (
      <div className="navItem">
        <IconName className="itemIcon"/>
        <a className="itemLink" href="#"> {this.props.title} </a>
        <Stylesheet sheet={item} />
      </div>
    )
  }
}

export default SideBarItem
