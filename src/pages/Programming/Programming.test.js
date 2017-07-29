import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Programming from './Programming';

test('Programming page should render as expected', () => {
  const component = shallow(<Programming />);
  const tree = toJson(component)
  expect(tree).toMatchSnapshot();
})
