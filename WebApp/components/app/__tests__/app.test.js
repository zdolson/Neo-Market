import React from 'react'
import {shallow} from 'enzyme'
import Index from '../index.js'
import {HashRouter} from 'react-router-dom'

describe('App Component', () => {

  it('renders one child', () => {
    const wrapper = shallow(<Index/>);

    let expected = 1;
    let actual = wrapper.length;

    expect(actual).toEqual(expected);
  });

});
