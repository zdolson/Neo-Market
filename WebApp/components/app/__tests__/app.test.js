import React from 'react'
import {shallow} from 'enzyme'
import App from '../app.js'
import {HashRouter} from 'react-router-dom'
import * as firebase from "firebase"

describe('App Component', () => {

  it('renders one child', () => {
    const wrapper = shallow(<App/>);

    let expected = 1;
    let actual = wrapper.length;

    expect(actual).toEqual(expected);
  });

});
