import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import SimpleTable from '../components/table/simpleTable'
import Theme from '../components/theme'
import Table from '../components/table'

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

const mockColumns = [
  { key: 1, dataIndex: 'name', title: 'name' },
  { key: 2, dataIndex: 'age', title: 'age' },
  { key: 3, dataIndex: 'address', title: 'address' },
  { key: 4, dataIndex: 'country', title: 'country' }
]

const mockData = [
  { key: 1, name: 'john', age: 31, address: 'london', country: 'china' },
  { key: 2, name: 'mary', age: 41, address: 'sidney', country: 'china' },
  { key: 3, name: 'sally', age: 11, address: 'guangdong', country: 'china' },
  { key: 4, name: 'tom', age: 21, address: 'henan', country: 'china' },
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
      <SimpleTable types={['compact']} data={data} columns={columns} />
    </Theme>
  ))
  .add('tiny', () => (
    <Theme>
      <SimpleTable types={['tiny']} data={data} columns={columns} />
    </Theme>
  ))
  .add('dashed', () => (
    <Theme>
      <SimpleTable types={['dashed']} data={data} columns={columns} />
    </Theme>
  ))
  .add('striped', () => (
    <Theme>
      <SimpleTable types={['striped']} data={data} columns={columns} />
    </Theme>
  ))
  .add('customize', () => (
    <Theme>
      <SimpleTable data={data1} columns={columns1} />
    </Theme>
  ))


class SelectedTable extends Component {
  state = {
    selectedKeys: [1, 2]
  }
  render() {
    const rowSelection = {
      selectedKeys: this.state.selectedKeys,
      onChange: (selectedKeys) => {
        this.setState({ selectedKeys })
      }
    }
    return (
      <Theme>
        <Table types={['selectable']} data={mockData} columns={mockColumns} rowSelection={rowSelection} />
      </Theme>
    )
  }
}

storiesOf('Table', module).add('selectable table', () => <SelectedTable />)
