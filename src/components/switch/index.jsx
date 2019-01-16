import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles/styles.less'

export class Switch extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    checkedText: PropTypes.string,
    unCheckedText: PropTypes.string,
    checkFunc: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      checked: props.checked || false,
    }
  }

  handleSwitchChange = () => {
    const { checked } = this.state
    const { checkFunc } = this.props
    this.setState({
      checked: !checked,
    })
    if (checkFunc) {
      checkFunc(!checked)
    }
  }

  render() {
    const { disabled, checkedText = 'On', unCheckedText = 'Off' } = this.props
    const { checked } = this.state
    return (
      <label className={`${styles.switch}`}>
        <input type="checkbox" disabled={disabled} checked={checked} onChange={this.handleSwitchChange} />
        <i className={`${styles.ball}`} />
        <span data-enabled={checkedText} data-disabled={unCheckedText} />
      </label>
    )
  }
}

export default Switch
