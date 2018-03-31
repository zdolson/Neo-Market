import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import {Stylesheet} from '../stylesheet.js'
import sheet from './topBar.scss'
import LogoIcon from '../assets/Logo.svg'
import SearchIcon from '../assets/SearchIcon.svg'
import cF from '../../../backend/contractFunctions'

/**

@ Alec

@ 2/22/18

Purpose: TopBar component; Provides template for top nav bar

**/

export class TopBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {

    }
    this.isRegister = this.isRegister.bind(this);
  }


  isRegister = () => {

      // cF.register('42','satan');
      // cF.isRegister('42','satan');
      // cF.createPost('123','satan','rice','fried rice brah','3','1');
      // cF.createPost('42','satan','Vs','dem victories breh','9000','1');
      // cF.getAllUsersFromStorage();
      // cF.getUserPostsFromStorage('satan');
      // cF.getUserPostsFromStorage('tom');
      // cF.getAddressFromUser('satan');

      cF.getAllPostsFromStorage();

      // cF.getContractState();

      // cF.register('tom','5');
      // cF.register('satan','42');
      // let block = cF.getBlockCount();
      // console.log(block);

      // cF.isRegister('79','tom');
      // cF.createPost('10','tom','bananas','soooo yellow','10','6');
      // cF.createPost('13','tom','fathead','much big','12','1');

      // cF.getUserPostsFromStorage('tom').then(users => {
      //     console.log(users)
      // }).catch(err => {
      //     console.error(err)
      // })
      // cF.getAllPostsFromStorage();

      // cF.createPost('456','jesus','eggs','friedeggs','1','12');
      // cF.accessStorage('666');
      // cF.register('666','jesus');

  }

  render () {
    return (
      <div className="topnav">
        <NavLink to="/" className="logo"> <LogoIcon /> </NavLink>
        <div className="zachBtn" onClick={this.isRegister}>
          Property of Zach
        </div>
        <div className="search">
          <SearchIcon className="searchicon" />
          <div className="searchbubble">
            search...
          </div>
        </div>
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default TopBar
