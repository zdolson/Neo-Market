import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import {Stylesheet} from '../stylesheet.js'
import sheet from './topBar.scss'
import LogoIcon from '../assets/Logo.svg'
import SearchIcon from '../assets/SearchIcon.svg'
import cF from '../../neonFunctions/contractFunctions'
import node from '../../neonFunctions/blockchain'
// const neon = require('@cityofzion/neon-js')
// const Neon = neon.default

import { logoutUser } from '../fireBaseFunctions.js'
import FilterIcon from '../assets/FilterIcon.svg'

/**

@ Alec

@ 2/22/18

Purpose: TopBar component; Provides template for top nav bar

**/

export class TopBar extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      menu_is_open: false,
      filter_selected: 0,
      search_string: ''
    }
    this.topbarTestingButton = this.topbarTestingButton.bind(this);
    this.LogoutHandler = this.LogoutHandler.bind(this);
    this.openFilter = this.openFilter.bind(this);
    this.closeFilter = this.closeFilter.bind(this);
    this.titleSelect = this.titleSelect.bind(this);
    this.descSelect = this.descSelect.bind(this);
    this.priceSelect = this.priceSelect.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  LogoutHandler = () => {
    logoutUser()
  }

  topbarTestingButton = () => {
      // cF.purchase('dlang','zdolson');
      // cF.register('tom','20');
      // cF.createPost('123', 'tom', 'diary', 'tom riddle\'s diary', '3', '1');
      // cF.createPost('321','tom','wand','the elder wand foo','10','1');
      // cF.register('homie','42');
      // cF.createPost('456','homie','water bottle','its a water bottle','2','1');
      // cF.register('zdolson', '11');
      // node.getBalance('AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y').then(balance => {
      //     console.log(balance);
      // });
      // node.getRPCEndpoint().then(rpcEndpoint => {
      //     var client = Neon.create.rpcClient(rpcEndpoint);
      //     client.getRawTransaction("6f0a48873919d61b853f6d6d587538e8b4f2c12f26e517ecd00cf603b910e254",1).then(tx => {
      //         console.log(tx);
      //     })
      // })
      // cF.getContractState().then(state => {
      //     console.log(state);
      // })
      console.log(cF.sha256('test') === cF.sha256('test'));

      // <div className="zachBtn" onClick={this.topbarTestingButton}>
      //   Property of Zach
      // </div>
  }

  openFilter = (event) => {
    event.preventDefault();
    this.setState({menu_is_open: true}, () => {
      document.addEventListener('click', this.closeFilter);
    });
  }

  closeFilter = (event) => {
    if(!this.menu_ref.contains(event.target))
      this.setState({menu_is_open: false}, () => {
        document.removeEventListener('click', this.closeFilter);
      })
  }

  titleSelect = (event) => {
    this.props.updateFilter('title');
    event.preventDefault();
    this.setState( {filter_selected: 0} );
  }

  descSelect = (event) => {
    this.props.updateFilter('description');
    event.preventDefault();
    this.setState( {filter_selected: 1} );
  }

  priceSelect = (event) => {
    this.props.updateFilter('price');
    event.preventDefault();
    this.setState( {filter_selected: 2} );
  }

  searchHandler = (event) => {
    this.props.updateSearch(this.state.search_string);
  }

  searchChange = (event) => {
    this.setState( {search_string: event.target.value} );
  }

  render () {

    let styles = {
      selected: {
        background: '#D3D3D3'
      },
      un_selected: {}
    }
    let filter_styles = [styles.un_selected, styles.un_selected, styles.un_selected];
    filter_styles[this.state.filter_selected] = styles.selected;

    return (
      <div className="main-container">
        <div className="topnav">
          <NavLink to="/" className="logo"> <LogoIcon /> </NavLink>
          <div className="search">
            <SearchIcon className="searchicon" onClick={this.searchHandler}/>
            <input type="text" placeholder="search..." className="searchbubble" value={this.state.search_string} onChange={this.searchChange}></input>
            <div className="filter" onClick={this.openFilter}>
              <FilterIcon/>
            </div>
          </div>
        </div>

        { this.state.menu_is_open
          ? (
            <div>
              <div className="filter-flow"></div>
              <div className="filter-menu" ref={(ref) => { this.menu_ref = ref; }}>
                <div style={filter_styles[0]} className="filter-title" onClick={this.titleSelect}>TITLE</div>
                <div style={filter_styles[1]} className="filter-description" onClick={this.descSelect}>DESCRIPTION</div>
              </div>
            </div>
          ):(
            null
          )
        }
        <Stylesheet sheet={sheet} />
      </div>
    )
  }
}

export default TopBar
