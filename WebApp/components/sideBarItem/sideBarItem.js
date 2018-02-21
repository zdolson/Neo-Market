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


/**

@ Alec

@ 2/20/18

@ Purpose: Allows for SideBar component to pass in props determining contents of its items

Briefly explain any nuances or specific choices

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
    Wallet: WalletIcon
  };

  render () {
    const title = this.props.title
    console.log(title)
    const yolo = this.components[title]
    console.log(yolo)
    const IconName = this.components['Forums']
    console.log(IconName)
    return (
      <div className="navItem">
        <IconName />
        <a className="itemLink" href="#"> {this.props.title} </a>
        <Stylesheet sheet={item} />
      </div>
    )
  }
}

export default SideBarItem
