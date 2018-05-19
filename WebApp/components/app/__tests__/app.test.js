import React from 'react'
import {shallow} from 'enzyme'
import App from '../app.js'
import {HashRouter} from 'react-router-dom'
import * as firebase from "firebase"
import {loginUser, initializeApp} from '../../fireBaseFunctions.js'

import RightSideBar from '../../rightSideBar/rightSideBar.js'
import RoutingComponent from '../../routingComponent/routingComponent.js'

describe('App Component', () => {

  // Firebase initialization
  initializeApp();
  loginUser('allfelt@ucsc.edu', 'allfelt');

  const wrapper = shallow(<App/>);

  it('renders one child', () => {
    let expected = 1;
    let actual = wrapper.length;

    expect(actual).toEqual(expected);
  });

  it('renders 6 component predecessors', () => {
    let expected = 6;
    let actual = wrapper.childAt(0).children().length;

    expect(actual).toEqual(expected);
  });

  it('passes RightSideBar 5 props', () => {
    let expected = 5;
    let actual = Object.keys(wrapper.find(RightSideBar).props()).length;

    expect(actual).toEqual(expected);
  });

  it('passes RoutingComponent 12 props', () => {
    let expected = 12;
    let actual = Object.keys(wrapper.find(RoutingComponent).props()).length;

    expect(actual).toEqual(expected);
  });

});
