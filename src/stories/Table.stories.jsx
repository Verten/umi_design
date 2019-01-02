import React from 'react'
import { storiesOf } from '@storybook/react'
import SimpleTable from '../components/table/simpleTable'
import Theme from '../components/theme';

const data = [
  { name: 'Edit Mobile Devices', operation: 'Edit', resource: 'Mobile Devices' },
  { name: 'Delete Mobile Devices', operation: 'Delete', resource: 'Mobile Devices' },
  { name: 'View IT Sevices List', operation: 'View', resource: 'IT Sevices' },
  { name: 'Manage Users', operation: 'Manage', resource: 'Users' },
  { name: 'Manage Organizations', operation: 'Manage', resource: 'Orginazitions' },
  { name: 'Manage Roles', operation: 'Manage', resource: 'Roles and Permissions' },
]

const columns = [
  {
    Header: 'Permission Name',
    accessor: 'name',
  },
  {
    Header: 'Operation',
    accessor: 'name',
  },
  {
    Header: 'Resource',
    accessor: 'resource',
  },
]

const data1 = [
  {
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    },
  },
]

const columns1 = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Age',
    accessor: 'age',
    Cell: props => <span className="number">{props.value}</span>,
  },
  {
    id: 'friendName',
    Header: 'Friend Name',
    accessor: d => d.friend.name,
  },
  {
    Header: () => <span>Friend Age</span>,
    accessor: 'friend.age',
  },
]

//compact, tiny, dashed, striped
storiesOf('Table', module)
  .add('default', () => (
    <Theme>
      <SimpleTable data={data} columns={columns} />
    </Theme>
  ))
  .add('compact', () => (
    <Theme>
      <SimpleTable styles={'compact'} data={data} columns={columns} />
    </Theme>
  ))
  .add('tiny', () => (
    <Theme>
      <SimpleTable styles={'tiny'} data={data} columns={columns} />
    </Theme>
  ))
  .add('dashed', () => (
    <Theme>
      <SimpleTable styles={'dashed'} data={data} columns={columns} />
    </Theme>
  ))
  .add('striped', () => (
    <Theme>
      <SimpleTable styles={'striped'} data={data} columns={columns} />
    </Theme>
  ))
  .add('customize', () => (
    <Theme>
      <SimpleTable data={data1} columns={columns1} />
    </Theme>
  ))
