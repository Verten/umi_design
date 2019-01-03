import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { uniqueId } from 'lodash'
import './styles/styles.less'

export default class Checkbox extends Component {
  static propTypes = {
    indeterminate: PropTypes.bool,
  }
  constructor(props) {
    super(props)
    this.checkboxRef = createRef()
    this.checkboxId = props.id || `eds-checkobx-${uniqueId()}`
  }
  componentDidMount() {
    this.setIndeterminate()
  }
  componentDidUpdate() {
    this.setIndeterminate()
  }
  setIndeterminate() {
    const { indeterminate } = this.props
    const checkboxElement = this.checkboxRef.current
    checkboxElement.indeterminate = indeterminate
  }
  render() {
    const { indeterminate, children, ...domProps } = this.props
    return (
      <div>
        <input
          {...domProps}
          id={this.checkboxId}
          type="checkbox"
          ref={this.checkboxRef}
        />
        <label htmlFor={this.checkboxId}>{children}</label>
      </div>
    )
  }
}
