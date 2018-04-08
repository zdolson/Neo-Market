import React, { Component } from 'react'
import { Stylesheet } from '../stylesheet.js'
import sheet from './filterDropdown.scss'

import FilterDropdownContent from './filterDropdownContent/filterDropdownContent.js'
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
    var containerHegith = contentHeight + 25;
    const styles = {
      filterDropdown: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'fixed',
        alignSelf: 'center',
        left: 30+'%',
        top: 50+'px',
        width: 40+'%',
        height: {contentHeight}+'px',
        zIndex: 1,
        overflowY: 'hidden',
        background: 'transparent',
      }
    }
    return (
      <div style={styles.filterDropdown}>
        <FilterDropdownContent width={contentHeight} />
        <ArrowTabDown onClick={this.dropdownToggle} />
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default FilterDropdown
