import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../checkbox'
import styles from './styles/styles.less'

const TABLE_CHECKBOX_KEY = 'eds-table-checkbox'
const SORT_ASC = 'asc'
const SORT_DESC = 'desc'
const SORT_DEFUALT = 'is-sortable'
const SORT_PROP_NAME = 'sorter'

export default class Table extends Component {
  static propTypes = {
    type: PropTypes.string,
    data: PropTypes.array,
    columns: PropTypes.array,
    rowSelection: PropTypes.object,
  }

  static defaultProps = {
    data: [],
    columns: [],
  }
  
  constructor(props) {
    super(props)
    this.state = {
      sortOrder: SORT_DEFUALT,
      sortColumnKey: '',
    }
  }

  renderHead() {
    const { columns, rowSelection, data } = this.props
    const { sortOrder, sortColumnKey } = this.state
    const cols = columns.map(col => {
      const { key, title, sorter } = col
      const handleClick = typeof sorter === 'function' ? () => this.toggleSorter(col) : null
      let thClassName = sorter ? SORT_DEFUALT : ''
      if (key === sortColumnKey) {
        switch (sortOrder) {
          case SORT_ASC:
            thClassName = SORT_ASC
            break
          case SORT_DESC:
            thClassName = SORT_DESC
            break
          default:
            thClassName = SORT_DEFUALT
        }
      }
      return (
        <th onClick={handleClick} className={thClassName} key={key}>{title}</th>
      )
    })
    if (rowSelection) {
      const selectedKeysCount = rowSelection.selectedKeys.length
      const isSelectAll = selectedKeysCount === data.length 
      const indeterminate = selectedKeysCount < data.length && selectedKeysCount > 0
      cols.unshift(
        <th key={TABLE_CHECKBOX_KEY}>
          <Checkbox
            checked={isSelectAll}
            indeterminate={indeterminate}
            onChange={this.toggleSelectAll}
          />
        </th>
      )
    }
    return <tr>{cols}</tr>
  }

  renderRow(record) {
    const { columns, rowSelection } = this.props 
    const row = columns.map(col => {
      const { key, dataIndex, render } = col
      const tdText = record[dataIndex]
      const tdContent = typeof render === 'function' ? render(tdText, record) : tdText
      return <td key={key}>{tdContent}</td>
    })
    if (rowSelection) {
      const { selectedKeys } = rowSelection
      const { key } = record
      const selected = Array.isArray(selectedKeys) && selectedKeys.includes(key)
      row.unshift(
        <td key={TABLE_CHECKBOX_KEY}>
          <Checkbox checked={selected} onChange={e => this.handleSelectChange(e, record)} />
        </td>
      )
    }
    return row
  }

  handleSelectChange(e, record) {
    const { selectedKeys, onChange } = this.props.rowSelection
    if (typeof onChange === 'function') {
      const { key } = record
      const selected = e.target.checked
      const selectedRowKeys = selected
        ? [...selectedKeys, key]
        : [...selectedKeys.filter(k => k !== key)]

      onChange(selectedRowKeys)
    }
  }

  toggleSelectAll = e => {
    const { data, rowSelection } = this.props
    const isSelectAll = rowSelection.selectedKeys.length === 0
    let selectedKeys = isSelectAll ? data.map(record => record.key) : []
    rowSelection.onChange(selectedKeys)
  }

  toggleSorter = (col) => {
    const { sortOrder } = this.state
    const sortOrderTypes = [SORT_DEFUALT, SORT_ASC, SORT_DESC]
    const curIndex = sortOrderTypes.indexOf(sortOrder)
    const nextIndex = curIndex >= sortOrderTypes.length - 1 ? 0 : curIndex + 1
    const nextSortOrder = sortOrderTypes[nextIndex]
    this.setState({ sortOrder: nextSortOrder, sortColumnKey: col.key })
  }

  sortData(data) {
    const { sortOrder, sortColumnKey } = this.state
    const { columns } = this.props
    const sorterBaseColumn = columns.find(col => col.key === sortColumnKey)
    if (sorterBaseColumn && sortOrder !== SORT_DEFUALT) {
      const { dataIndex } = sorterBaseColumn
      const ascSorter = (a, b) => {
        if (a[dataIndex] < b[dataIndex]) return -1
        if (a[dataIndex] > b[dataIndex]) return 1
        return 0
      }
      const descSorter = (a, b) => {
        if (a[dataIndex] < b[dataIndex]) return 1
        if (a[dataIndex] > b[dataIndex]) return -1
        return 0
      }
      const sorterMap = {
        [SORT_ASC]: ascSorter,
        [SORT_DESC]: descSorter,
      }
      const sorter = sorterMap[sortOrder] 
      const sortedData = data.sort(sorter)
      return sortedData
    }
    return data
  }

  renderBody() {
    let { data, rowSelection } = this.props
    let tableData = this.sortData([...data])
    const body = tableData.map(record => {
      const selected = rowSelection && rowSelection.selectedKeys.includes(record.key)
      return <tr className={selected ? 'selected' : ''} key={record.key}>{this.renderRow(record)}</tr>
    })
    return body
  }

  getTableClassName() {
    const { type = '', columns, rowSelection } = this.props
    const sortable = columns.some(col => typeof col.sorter === 'function')
    const classNames = ['table', type]
    if (rowSelection) {
      classNames.push('selectable')
    }
    if (sortable) {
      classNames.push('sortable')
    }
    return classNames.join(' ')
  }

  render() {
    return (
      <table className={this.getTableClassName()}>
        <thead>{this.renderHead()}</thead>
        <tbody>{this.renderBody()}</tbody>
      </table>
    )
  }
}
