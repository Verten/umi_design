import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
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

  render() {
    return (
      <header className={styles.sysbar}>
        <div className={styles['items-container']}>
          <div className={styles.item}>
            <i className="icon icon-econ" />
            <span className={styles.product}>Account Manager</span>
            <span className={styles.acronym}>Account Manager</span>
          </div>
        </div>
        <div className={styles['items-container']}>
          <div className={`${styles.item} ${styles.hover}`}>
            <i className={`${styles.icon} ${styles['icon-profile']}`} />
            <a>Username</a>
          </div>
          <div className={`${styles.item} ${styles.hover} settings-trigger`}>
            <span onClick={this.handleLogout}>Sign Out</span>
          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state.app
  return {
    auth,
  }
}

export default connect(mapStateToProps)(Header)
