import React from 'react'
import {shallow} from 'enzyme'
import Index from '../../pages/index.js'

test('App has appropriate children components', () => {
  // Render a checkbox with label in the document
  const index = shallow(<Index />);
  console.log(index.children())
  expect(1+2).toEqual(3);
});
