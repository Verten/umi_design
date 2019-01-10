import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import Theme from '../components/theme'
import Table from '../components/table'
import Button from '../components/button'
import Input from '../components/text-field/Input'
import { debounce } from 'lodash'

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
  { key: 1, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 2, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 3, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 4, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 5, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
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

function SortableTable() {
  const sortableTableColumns = [
    { key: 1, dataIndex: 'name', title: 'name', sortable: true },
    { key: 2, dataIndex: 'age', title: 'age', sortable: true },
    { key: 3, dataIndex: 'address', title: 'address' },
    { key: 4, dataIndex: 'country', title: 'country' },
    {
      key: 5, dataIndex: 'action', title: 'action',
      render: (text, record) => (
        <Button onClick={() => alert(record.name)}>show name</Button>
      )
    },
  ]
  return (
    <Theme>
      <Table columns={sortableTableColumns} data={mockData} />
    </Theme>
  )
}

function FilterableTable()  {
  const filterableTableColumns = [
    { key: 1, dataIndex: 'name', title: 'name', },
    { key: 2, dataIndex: 'age', title: 'age', },
    { key: 3, dataIndex: 'address', title: 'address' },
    { key: 4, dataIndex: 'country', title: 'country', filterable: true },
    {
      key: 5, dataIndex: 'action', title: 'action',
      render: (text, record) => (
        <Button onClick={() => alert(record.name)}>show name</Button>
      )
    },
  ]
  return (
    <Theme>
      <Table columns={filterableTableColumns} data={mockData} />
    </Theme>
  )
}

const pagingData = [
  { key: 1, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 2, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 3, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 4, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 5, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
  { key: 11, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 12, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 13, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 14, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 15, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
  { key: 21, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 22, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 23, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 24, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 25, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
  { key: 31, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 32, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 33, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 34, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 35, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
  { key: 41, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 42, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 43, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 44, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 45, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
  { key: 51, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 52, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 53, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 54, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 55, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
  { key: 61, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 62, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 63, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 64, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 65, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
  { key: 71, name: 'ben', age: 41, address: 'guangdong', country: 'china' },
  { key: 72, name: 'doge', age: 21, address: 'london', country: 'UK' },
  { key: 73, name: 'aya', age: 31, address: 'shanxi', country: 'china' },
  { key: 74, name: 'cat', age: 11, address: 'newyork', country: 'USA' },
  { key: 75, name: 'jack', age: 24, address: 'shenzhen', country: 'china' },
]
class CustomizeTable extends Component {
  state = {
    selectedKeys: [],
    searchKey: '',
  }
  render() {
    const filterableTableColumns = [
      { key: 1, dataIndex: 'name', title: 'name', sortable: true },
      { key: 2, dataIndex: 'age', title: 'age', sortable: true },
      { key: 3, dataIndex: 'address', title: 'address' },
      { key: 4, dataIndex: 'country', title: 'country', filterable: true },
      {
        key: 5, dataIndex: 'action', title: 'action',
        render: (text, record) => (
          <Button onClick={() => alert(record.name)}>show name</Button>
        )
      },
    ]
    const rowSelection = {
      selectedKeys: this.state.selectedKeys,
      onChange: (selectedKeys) => {
        this.setState({ selectedKeys })
      }
    }
    return (
      <Theme>
        <div style={{ marginRight: '4px', float: 'right', whiteSpace: 'nowrap' }}>
          <Input
            suffix="icon-search"
            icon="icon-search"
            onEnter={(e) => this.setState({ searchKey: e.target.value })}
          />
        </div>
        <Table
          searchKey={this.state.searchKey}
          pagination={{pageSize: 4}}
          columns={filterableTableColumns}
          data={pagingData}
          rowSelection={rowSelection} />
      </Theme>
    )
  }
}

function PagingTable() {
  const pagingTableColumns = [
    { key: 1, dataIndex: 'name', title: 'name' },
    { key: 2, dataIndex: 'age', title: 'age', sortable: true },
    { key: 3, dataIndex: 'address', title: 'address' },
    { key: 4, dataIndex: 'country', title: 'country', filterable: true },
    {
      key: 5, dataIndex: 'action', title: 'action',
      render: (text, record) => (
        <Button onClick={() => alert(record.name)}>show name</Button>
      )
    },
  ]
 
  return (
    <Theme>
      <Table
        columns={pagingTableColumns}
        pagination={{pageSize: 4, totalSize: pagingData.length}}
        data={pagingData} />
    </Theme>
  )
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
  .add('filterable table', () => <FilterableTable />)
  .add('paging table', () => <PagingTable />)
  .add('customize table', () => <CustomizeTable />)

