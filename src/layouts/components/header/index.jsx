import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withRouter } from 'react-router'
import { multiLanguage } from '../../../utilities/helper'
import styles from './index.less'

export class Header extends Component {
  static propTypes = {
    signInFunc: PropTypes.func,
    userInfo: PropTypes.object,
  }

  handleLogout = () => {
    this.props.auth.logout({
      postLogoutRedirectUri: 'https://localhost:3000/logout',
      idTokenHint: localStorage.getItem('id_token'),
    })
  }

  handleSignIn = () => {
    const { auth, location } = this.props
    const to = location.query.to
    const defaultState = {
      usePostMessage: false,
      date: new Date(),
      path: 'home',
    }
    if (to) {
      Object.assign(defaultState, { path: to })
    }
    const encodeState = btoa(JSON.stringify(defaultState))
    auth.login({ state: encodeState, nonce: auth.randomString() })
  }

  renderUserName = userInfo => {
    if (userInfo && userInfo.user_info) {
      return (
        <div className={`${styles.item} ${styles.hover}`}>
          <i className={`${styles.icon} ${styles['icon-profile']}`} />
          <a>{`${userInfo.user_info.first_name}`}</a>
        </div>
      )
    }
    return <div />
  }

  renderOperation = userInfo => {
    if (userInfo && userInfo.user_info) {
      return (
        <div className={`${styles.item} ${styles.hover} settings-trigger`}>
          <span onClick={this.handleLogout}>{multiLanguage('SIGN_OUT')}</span>
        </div>
      )
    }
    return (
      <div className={`${styles.item} ${styles.hover} settings-trigger`}>
        <span onClick={this.handleSignIn}>{multiLanguage('SIGN_IN')}</span>
      </div>
    )
  }

  render() {
    return (
      <header className={styles.sysbar}>
        <div className={styles['items-container']}>
          <div className={styles.item}>
            <i className="icon icon-econ" />
            <span className={styles.product}>{multiLanguage('SYSTEM_TITLE')}</span>
            <span className={styles.acronym}>{multiLanguage('SYSTEM_TITLE')}</span>
          </div>
        </div>
        <div className={styles['items-container']}>
          {this.renderUserName(this.props.userInfo)}
          {this.renderOperation(this.props.userInfo)}
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  const { auth, userInfo } = state.app
  return {
    auth,
    userInfo,
  }
}

export default withRouter(connect(mapStateToProps)(Header))
