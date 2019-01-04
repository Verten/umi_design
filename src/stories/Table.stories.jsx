import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import Theme from '../components/theme'
import Table from '../components/table'
import Button from '../components/button'

const mockColumns = [
  { key: 1, dataIndex: 'name', title: 'name' },
  { key: 2, dataIndex: 'age', title: 'age' },
  { key: 3, dataIndex: 'address', title: 'address' },
  { key: 4, dataIndex: 'country', title: 'country' },
  {
    key: 5, dataIndex: 'action', title: 'action',
    render: (text, record) => (
      <Button onClick={() => alert(record.name)}>show name</Button>
    )
  },
]

const mockData = [
  { key: 2, name: 'ben', age: 41, address: 'sidney', country: 'china' },
  { key: 4, name: 'doge', age: 21, address: 'henan', country: 'china' },
  { key: 1, name: 'aya', age: 31, address: 'london', country: 'china' },
  { key: 3, name: 'cat', age: 11, address: 'guangdong', country: 'china' },
]
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
        <Table data={mockData} columns={mockColumns} rowSelection={rowSelection} />
      </Theme>
    )
  }
}

class SortableTable extends Component {
  render() {
    const sortableTableColumns = [...mockColumns]
    sortableTableColumns[1].sorter = (a, b) => a < b
    sortableTableColumns[0].sorter = (a, b) => a < b
    return (
      <Theme>
        <Table columns={sortableTableColumns} data={mockData} />
      </Theme>
    )
  }
}

//compact, tiny, dashed, striped
storiesOf('Table', module)
  .add('default', () => (
    <Theme>
      <Table data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('compact', () => (
    <Theme>
      <Table type="compact" data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('tiny', () => (
    <Theme>
      <Table type="tiny" data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('dashed', () => (
    <Theme>
      <Table type="dashed" data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('striped', () => (
    <Theme>
      <Table type="striped" data={mockData} columns={mockColumns} />
    </Theme>
  ))
  .add('selectable table', () => <SelectedTable />)
  .add('sortable table', () => <SortableTable />)

