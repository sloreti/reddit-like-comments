import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

it('It should upvote and then remove upvote', () => {
  const component = renderer.create(<App />);
  expect(component.toJSON()).toMatchSnapshot();
  component.getInstance().vote([0,0,0], 1);
  expect(component.toJSON()).toMatchSnapshot();
  component.getInstance().vote([0,0,0], 1)
  expect(component.toJSON()).toMatchSnapshot();
});