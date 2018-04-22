import React from 'react'
import {shallow} from 'enzyme'
import Index from '../index.js'
import {HashRouter} from 'react-router-dom'
import * as firebase from "firebase"

describe("Index component", () => {
  it("renders one child", () => {
    let wrapper = shallow(<Index/>);

    let expected = 1;
    let actual = wrapper.length;

    expect(actual).toEqual(expected)
  });

  it("renders a HashRouter child", () => {
    let wrapper = shallow(<Index/>);

    let expected = 1;
    let actual = wrapper.find("HashRouter").length;

    expect(expected).toEqual(actual);
  });

  it("configures Firebase to our app", () => {
    let wrapper = shallow(<Index/>);

    let expected = "neo-market-8a303";
    let actual = firebase.app().options_.projectId;

    expect(actual).toEqual(actual);
  });
});
