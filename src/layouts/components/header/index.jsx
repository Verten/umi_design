import React, { Component } from 'react'
import styles from './index.less'

export class Header extends Component {
  static propTypes = {}

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
            <span>Sign Out</span>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
