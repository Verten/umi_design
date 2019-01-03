import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../checkbox'
import styles from './styles/styles.less'

const TABLE_CHECKBOX_KEY = 'eds-table-checkbox'

export default class Table extends Component {
  static propTypes = {
    types: PropTypes.array,
    data: PropTypes.array,
    columns: PropTypes.array,
    rowSelection: PropTypes.object,
  }

  renderHead() {
    const { columns, rowSelection, data } = this.props
    const selectedKeysCount = rowSelection.selectedKeys.length
    const indeterminate = selectedKeysCount < data.length && selectedKeysCount > 0
    const isSelectAll = selectedKeysCount === data.length 
    const cols = columns.map(col => {
      return <th key={col.key}>{col.title}</th>
    })
    if (rowSelection) {
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
      return <td key={col.key}>{record[col.dataIndex]}</td>
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

  renderBody() {
    const { data, rowSelection } = this.props
    const body = data.map(record => {
      const selected = rowSelection.selectedKeys.includes(record.key)
      return <tr className={selected ? 'selected' : ''} key={record.key}>{this.renderRow(record)}</tr>
    })
    return body
  }

  render() {
    const { types } = this.props
    return (
      <table className={`table ${types.join(' ')}`}>
        <thead>{this.renderHead()}</thead>
        <tbody>{this.renderBody()}</tbody>
      </table>
    )
  }
}
