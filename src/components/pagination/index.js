import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../dropdown'
import Input from '../text-field/Input'
import styles from './styles/styles.less'

export class Pagination extends Component {
  static propTypes = {
    totalSize: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
    currentPage: PropTypes.number,
    defaultCurrent: PropTypes.number,
    showQuickJumper: PropTypes.bool,
    showSizeChanger: PropTypes.bool,
    showTotal: PropTypes.func,
  }

  static defaultProps = {
    defaultCurrent: 1,
    pageSize: 10,
  }

  constructor(props) {
    super(props)
    this.state = {
      currentPage: props.defaultCurrent,
      pageSize: props.pageSize,
      pageIndex: Math.ceil(props.totalSize / props.pageSize),
      quickJumperValue: ''
    }
  }

  handleClickPreviousPage = e => {
    let { currentPage } = this.state
    if (currentPage === 1) {
      return
    }
    this.handleChange(--currentPage)
  }

  handleClickPageIndex = (e, index) => {
    this.handleChange(index)
  }

  handleClickNextPage = e => {
    let { currentPage, pageIndex } = this.state
    if (currentPage === pageIndex) {
      return
    }
    this.handleChange(++currentPage)
  }

  handleChange  = (nextPage) => {
    if (isNaN(nextPage)) {
      return
    }
    const { onChange } = this.props
    const { pageIndex } = this.state
    if (nextPage < 1) {
      nextPage = 1
    }
    if (nextPage > pageIndex) {
      nextPage = pageIndex
    }
    if (typeof onChange === 'function') {
      onChange(nextPage)
    }
    if (!('currentPage' in this.props)) {
      this.setState({ currentPage: nextPage })
    }
  }

  handleChangePageSize = pageSize => {
    const { totalSize, onPageSizeChange } = this.props
    if (typeof onPageSizeChange === 'function') {
      onPageSizeChange(pageSize)
    } 
    this.setState({
      pageSize: pageSize,
      currentPage: 1,
      pageIndex: Math.ceil(totalSize / pageSize),
    })
  }

  renderPreviousButton = () => {
    const { currentPage } = this.state
    return (
      <li className={currentPage === 1 ? styles.disabled : ''} onClick={this.handleClickPreviousPage}>
        <i className={`${styles['icon']} ${styles['icon-arrow-left']}`} />
      </li>
    )
  }

  renderNextButton = () => {
    const { currentPage, pageIndex } = this.state
    return (
      <li className={`${currentPage === pageIndex ? styles.disabled : ''}`} onClick={this.handleClickNextPage}>
        <i className={`${styles['icon']} ${styles['icon-arrow-right']}`} />
      </li>
    )
  }

  renderPageIndex = () => {
    const { pageIndex, currentPage } = this.state
    const pageIndexElement = []
    if (pageIndex <= 7) {
      for (let index = 1; index <= pageIndex; index++) {
        this.pushPageIndex(pageIndexElement, index, currentPage)
      }
    } else {
      if (currentPage <= 4) {
        // 1 2 3 4 5 ... 10
        for (let index = 1; index <= 5; index++) {
          this.pushPageIndex(pageIndexElement, index, currentPage)
        }
        pageIndexElement.push(<li key={Math.random()} />)
        pageIndexElement.push(
          <li
            key={pageIndex}
            className={`${pageIndex === currentPage ? styles.active : ''}`}
            onClick={e => this.handleClickPageIndex(e, pageIndex)}>
            {pageIndex}
          </li>,
        )
      } else if (currentPage < pageIndex - 3) {
        // 1 ... n-1 n n+1 ... 10
        this.pushPageIndex(pageIndexElement, 1, currentPage)
        pageIndexElement.push(<li key={Math.random()} />)
        for (let index = currentPage - 1; index <= currentPage + 1; index++) {
          this.pushPageIndex(pageIndexElement, index, currentPage)
        }
        pageIndexElement.push(<li key={Math.random()} />)
        this.pushPageIndex(pageIndexElement, pageIndex, currentPage)
      } else {
        // 1 ... 6 7 8 9 10
        this.pushPageIndex(pageIndexElement, 1, currentPage)
        pageIndexElement.push(<li key={Math.random()} />)
        for (let index = pageIndex - 4; index <= pageIndex; index++) {
          this.pushPageIndex(pageIndexElement, index, currentPage)
        }
      }
    }
    return pageIndexElement
  }

  pushPageIndex(array, elementValue, currentValue) {
    array.push(
      <li
        key={elementValue}
        className={`${elementValue === currentValue ? styles.active : ''}`}
        onClick={e => this.handleClickPageIndex(e, elementValue)}>
        {elementValue}
      </li>,
    )
  }

  handleQuickJumperEnter = (e) => {
    this.handleChange(+e.target.value)
    this.setState({ quickJumperValue: '' })
  }

  handleQuickJumperChange = (e) => {
    this.setState({ quickJumperValue: e.target.value })
  }

  renderQuickJumper() {
    const { showQuickJumper } = this.props
    const { quickJumperValue } = this.state
    if (showQuickJumper) {
      return (
        <span>
          <Input
            value={quickJumperValue}
            label={{ text: 'Go to ', pos: 'left' }}
            onChange={this.handleQuickJumperChange}
            onEnter={this.handleQuickJumperEnter} />
        </span>
      )
    }
  }

  renderSizeChanger() {
    const { showSizeChanger } = this.props
    if (showSizeChanger) {
      return (
        <Dropdown
          label={'Show'}
          operationName={this.props.pageSize}
          operationItem={[5, 10, 15, 20, 50, 100]}
          itemChange={this.handleChangePageSize}
        />
      )
    }
  }

  renderTotal() {
    const { showTotal, totalSize } = this.props
    if (typeof showTotal === 'function') {
      return (
        <span className="total">
          {showTotal(totalSize)}
          <span>|</span>
        </span>
      )
    }
  }

  
  static getDerivedStateFromProps(props, state) {
    const newState = {
      pageIndex: Math.ceil(props.totalSize / state.pageSize) 
    }
    if ('currentPage' in props) {
      newState.currentPage = props.currentPage
    }
    return newState
  }

  render() {
    return (
      <div className={`${styles['pagination-group']}`} id="dynamic-pagination">
        <ul className={styles.pagination}>
          {this.renderPreviousButton()}
          {this.renderPageIndex()}
          {this.renderNextButton()}
        </ul>
        {this.renderTotal()}
        {this.renderSizeChanger()}
        {this.renderQuickJumper()}
      </div>
    )
  }
}

export default Pagination
