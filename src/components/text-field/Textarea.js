import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles/styles.less'

export default class Input extends Component {
  static propTypes = {

  }

  static defaultProps = {
    theme: 'light'
  }
  
  render() {
    const { theme, ...inputProps } = this.props
    return (
      <div className={styles[theme]}>
        <textarea {...inputProps}></textarea>
      </div>
    )
  }
}
