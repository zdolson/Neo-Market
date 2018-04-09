import React, { Component } from 'react'
import { Stylesheet } from '../../stylesheet.js'
import sheet from './filterDropdownContent.scss'

import FilterGroup from './filterGroup/filterGroup.js'

/**

@ Alec

@ Date: 2/28/18

Purpose: Container for the content of the dropdown

**/

class FilterDropdownContent extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  render () {
    var background = '#333333';
    console.log(this.props.width);
    const styles = {
      filterDropdownContent: {
        height: this.props.width,
        width: 100+'%',
        background: background,
        opacity: 0.9
      }
    }
    return (
      <div style={styles.filterDropdownContent}>
        <FilterGroup />
        <Stylesheet sheet={sheet}/>
      </div>
    )
  }
}

export default FilterDropdownContent
