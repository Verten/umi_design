import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon'

import styles from './styles/styles.less'

export class Notification extends Component {
  static propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    fullWidth: PropTypes.bool,
    children: PropTypes.element,
    onCloseFunc: PropTypes.func,
  }

  renderContent = () => {
    const { children } = this.props
    if (children) {
      return <div className={styles.description}>{this.props.children}</div>
    }
  }

  render() {
    const { fullWidth, title, onCloseFunc } = this.props
    return (
      <div className={`${styles.notification} ${fullWidth ? 'full-width' : ''}`}>
        <div className={`${styles['top-row']}`}>
          <div className={styles.title}>{title}</div>
          <Icon clickFunc={onCloseFunc} icon="icon-cross" className="close" />
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

export default Notification
