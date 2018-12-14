import React, { Component } from 'react'
import { get, upperCase } from 'lodash'
import PropTypes from 'prop-types'
import styles from './styles/styles.less'

export class SimpleTable extends Component {
  static propTypes = {
    theme: PropTypes.string,
    styles: PropTypes.string, // style can be: compact, tiny, dashed, striped
    data: PropTypes.array,
    columns: PropTypes.array,
  }

  static defaultProps = {
    theme: 'light',
    styles: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      currentPageIndex: 0,
      pageSize: 10,
      data: props.data || [],
    }
  }

  renderTableHeader = columns => {
    const headerColumns = []
    /**
     * [{
     *    Header: ''
     *    accessor: '',
     * }]
     */
    columns.forEach((column, index) => {
      let headerColumnValue = ''
      if (typeof column.Header === 'function') {
        headerColumnValue = column.Header() // props
      } else {
        headerColumnValue = column.Header
      }
      headerColumns.push(<th key={index}>{headerColumnValue}</th>)
    })
    return <tr>{headerColumns}</tr>
  }

  renderTableBody = (columns, data) => {
    const bodyRows = data.map((_data, index) => {
      const bodyColumns = columns.map((column, index) => {
        let bodyColumnsValue = ''
        if (typeof column.accessor === 'function') {
          bodyColumnsValue = column.accessor(_data)
        } else {
          bodyColumnsValue = get(_data, column.accessor)
        }
        if (column.Cell !== undefined && typeof column.Cell === 'function') {
          bodyColumnsValue = column.Cell({ value: bodyColumnsValue })
        }
        return <td key={index}>{bodyColumnsValue}</td>
      })
      return <tr key={index}>{bodyColumns}</tr>
    })
    return bodyRows
  }

  renderTableFooter = () => {}

  render() {
    const { theme, styles: propsStyle, columns } = this.props
    const { data } = this.state
    return (
      <div className={styles[theme]}>
        <table className={`${styles.table} ${styles[propsStyle]}`}>
          <thead>{this.renderTableHeader(columns)}</thead>
          <tbody>{this.renderTableBody(columns, data)}</tbody>
        </table>
      </div>
    )
  }
}

export default SimpleTable
