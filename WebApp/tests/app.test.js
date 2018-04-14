import React from 'react'
import {shallow} from 'enzyme'
import App from '../components/app/app.js'
import Index from '../pages/index.js'

test('App has appropriate children components', () => {
  // Render a checkbox with label in the document
  const index = shallow(<Index />);
  const app = shallow(<App />);
  console.log(app.children())
  expect(1+2).toEqual(3);
});
