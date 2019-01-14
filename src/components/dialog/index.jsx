import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Button from '../button'
import styles from './styles/styles.less'

export class Dialog extends Component {
  static propTypes = {
    type: PropTypes.string, // warning, default
    children: PropTypes.element,
    title: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    okButtonProps: PropTypes.object, // {disabled: true}
    cancelButtonProps: PropTypes.object, // {disabled: true}
  }

  renderBottom = () => {
    const {
      type = 'default',
      onCancel,
      onOk,
      okText = 'OK',
      cancelText = 'Cancel',
      cancelButtonProps = {},
      okButtonProps = {},
    } = this.props
    if (type === 'default') {
      return (
        <div className={styles.bottom}>
          <Button {...cancelButtonProps} onClick={onCancel}>
            {cancelText}
          </Button>
          <Button {...okButtonProps} onClick={onOk} primary={true}>
            {okText}
          </Button>
        </div>
      )
    } else if (type === 'warning') {
      return (
        <div className={styles.bottom}>
          <Button {...okButtonProps} onClick={onOk} warning={true}>
            {okText}
          </Button>
          <Button {...cancelButtonProps} onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      )
    }
  }

  render() {
    const { title, visible, children } = this.props
    return (
      <Fragment>
        <div className={`${styles.dialog} ${visible ? styles.show : ''}`}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.title}>{title}</div>
            </div>
            <div className={styles.body}>{children}</div>
            {this.renderBottom()}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Dialog
