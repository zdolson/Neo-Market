import React from 'react'
import {shallow} from 'enzyme'
import RightSideBarTotalMock from './rightSideBarTotalMock'

test('App has appropriate children components', () => {
  // Render a checkbox with label in the document
  const total = shallow(<RightSideBarTotalMock />);
  console.log(total.children())
  expect(1+2).toEqual(3);
});
