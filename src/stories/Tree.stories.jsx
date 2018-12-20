import React from 'react'
import { MemoryRouter } from 'react-router'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Tree from '../components/tree'

const trees = [
  {
    name: 'Menu1',
    path: '#',
  },
  {
    name: 'Menu2',
    path: '#',
  },
  {
    name: 'Menu3',
    path: '#',
    tree: [
      { name: 'SubMenu3-1', path: '#-1' },
      { name: 'SubMenu3-2', path: '#-2' },
      { name: 'SubMenu3-3', path: '#-3' },
      { name: 'SubMenu3-4', path: '#-4' },
      {
        name: 'SubMenu3-5',
        path: '#-5',
        tree: [{ name: 'SubMenu3-1-1', path: '#-1-1' }, { name: 'SubMenu3-1-2', path: '#-1-2' }],
      },
    ],
  },
]

storiesOf('Tree', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('default', () => <Tree tree={trees} />)
  .add('with active menu', () => <Tree tree={trees} selectedTree={'Menu2'} />)
  .add('with open menu', () => (
    <Tree tree={trees} selectedTree={'SubMenu3-2'} opendTree={'Menu3'} getSelectedTree={action('Selected Tree')} />
  ))
