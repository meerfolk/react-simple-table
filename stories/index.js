import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Table from '../src/Table';

const headers = [
  {
    header : "test1",
    accessor : "test1"
  },
  {
    header : "test2",
    accessor : "test2"
  },
  {
    header : "test3",
    accessor : "test3",
    color : "green"
  }
];

const body = [
  {
    test1 : 1,
    test2 : 2,
    test3 : 3
  },
  {
    test1 : 1,
    test3 : 3
  },
  {
    test1 : 1,
    test2 : 2
  }
]

storiesOf('Table', module)
  .add('default', () => <Table headers={headers} data={body}/>)
  .add('left direction', () => <Table headers={headers} data={body} direction={"left"}/>);

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);



// storiesOf('Button', module)
//   .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
//   .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
