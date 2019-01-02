import React, { Component, createRef } from 'react'
import { uniqueId } from 'lodash'
import './styles/styles.less'

export default class Checkbox extends Component {
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
    const { checked, label, indeterminate, ...domProps } = this.props
    return (
      <div>
        <input {...domProps} id={this.checkboxId} type="checkbox" defaultChecked={checked} ref={this.checkboxRef} />
        <label htmlFor={this.checkboxId}>{label}</label>
      </div>
    )
  }
}
