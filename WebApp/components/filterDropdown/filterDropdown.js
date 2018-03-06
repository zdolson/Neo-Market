import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './filterDropdown.scss'

import FilterDropdownContent from '../filterDropdownContent/filterDropdownContent.js'
import ArrowTabDown from '../assets/ArrowTabDown.svg'

/**

@ Alec

@ 2/28/18

Purpose: container for filter dropdown

**/

class FilterDropdown extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      dropdown: false
    }
    this.dropdownToggle.bind(this);
  }

  dropdownToggle = () => {
    console.log('pressed')
    this.setState({ dropdown: !this.state.dropdown });
  }

  render () {
    var contentHeight = (this.state.dropdown ? 225 : 0) + 'px';
    return (
      <div className="filterDropdown">
        <FilterDropdownContent width={contentHeight} />
        <ArrowTabDown onClick={this.dropdownToggle} />
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default FilterDropdown
