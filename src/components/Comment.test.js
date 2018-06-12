import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Comment from './Comment';

it('Should be 2 years', () => {
  const component = renderer.create(<Comment comment={{comments:[]}} users={[]}/>);
  expect( component.getInstance().simplePrettyTime(63113852000)).toBe("2 years");
});

it('Should be 1 year', () => {
  const component = renderer.create(<Comment comment={{comments:[]}} users={[]}/>);
  expect( component.getInstance().simplePrettyTime(63013840000)).toBe("1 year");
});

it('Should be 6 months', () => {
  const component = renderer.create(<Comment comment={{comments:[]}} users={[]}/>);
  expect( component.getInstance().simplePrettyTime(15778463000)).toBe("6 months");
});

it('Should be 7 days', () => {
  const component = renderer.create(<Comment comment={{comments:[]}} users={[]}/>);
  expect( component.getInstance().simplePrettyTime(691199999)).toBe("7 days");
});

it('Should be 6 hours', () => {
  const component = renderer.create(<Comment comment={{comments:[]}} users={[]}/>);
  expect( component.getInstance().simplePrettyTime(21600000)).toBe("6 hours");
});