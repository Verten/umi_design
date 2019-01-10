import React, { Component, Fragment } from 'react'
import styles from './styles/styles.less'
import { uniqueId } from 'lodash'

const KEYCODE_ENTER = 13
export default class Input extends Component {
  renderLabel(label, id) {
    if (label) {
      const { text, pos } = label
      return (
        <label id={id} className={pos}>{text}</label>
      )
    }
    return ''
  }
  renderSuffix(suffix, icon) {
    if ('suffix' in this.props) {
      return (
        <Fragment>
          {' '}
          <div className={`${styles.suffix} ${ icon ? styles['icon-inside'] : '' }`}>
            {icon ? <i className={`icon ${icon}`}></i> : suffix}
          </div>
        </Fragment>
      )
    }
  }
  renderPrefix(prefix, icon) {
    if ('prefix' in this.props) {
      return (
        <Fragment>
          <div className={`${styles.prefix} ${ icon ? styles['icon-inside'] : '' }`}>
            {icon ? <i className={`icon ${icon}`}></i> : prefix}
          </div>
          {' '}
        </Fragment>
      )
    }
  }
  handleKeyUp = (e) => {
    const { onEnter } = this.props
    if (e.keyCode === KEYCODE_ENTER && typeof onEnter === 'function') {
      this.props.onEnter(e)
    }
  }
  render() {
    const {
      prefix, suffix, label, icon, inputType = '', onEnter,
      id = `eds-input-${uniqueId()}`,
      ...inputProps
    } = this.props
    return (
      <Fragment>
        {this.renderLabel(label, id)}
        {this.renderPrefix(prefix, icon)}
        <input
          {...inputProps}
          id={id}
          className={`${inputType} ${icon ? styles['with-icon'] : ''}`}
          onKeyUp={this.handleKeyUp}
        />
        {this.renderSuffix(suffix, icon)}
      </Fragment>
    )
  }
}
