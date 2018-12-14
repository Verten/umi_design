import React from 'react'
import { storiesOf } from '@storybook/react'
import SimpleTable from '../components/table/simpleTable'

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
  .add('default', () => <SimpleTable data={data} columns={columns} />)
  .add('compact', () => <SimpleTable styles={'compact'} data={data} columns={columns} />)
  .add('tiny', () => <SimpleTable styles={'tiny'} data={data} columns={columns} />)
  .add('dashed', () => <SimpleTable styles={'dashed'} data={data} columns={columns} />)
  .add('striped', () => <SimpleTable styles={'striped'} data={data} columns={columns} />)
  .add('customize', () => <SimpleTable data={data1} columns={columns1} />)
