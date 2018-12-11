import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Menu from '../menu'

import styles from './index.less'

export class Body extends Component {
  static propTypes = {
    children: PropTypes.element,
  }

  render() {
    return (
      <main>
        <div className={`${styles.app} ${styles['slide-right']}`}>
          <nav className={styles.appbar}>
            <div className={styles['actions-left']}>
              <div className={styles.item}>
                <i className={`${styles['navigation-toggle']} ${styles.closed}`} />
              </div>
              <div className={`${styles['menu-anchor']} ${styles['open-menu']}`}>Menu</div>
              <div className={`${styles.title} ${styles['open-menu']}`}>
                <span className={`${styles['title-name']}`}>Example page</span>
                <span className={styles.subtitle}>Page subtitle</span>
              </div>
            </div>
            <div className={`${styles['actions-right']}`} />
          </nav>
          <div className={styles.appbody}>
            <div className={styles.appnav} />
            <div className={styles.appcontent}>{this.props.children}</div>
          </div>
        </div>
      </main>
    )
  }
}

export default Body
