import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './index.less'

export class Menu extends Component {
  static propTypes = {
    menu: PropTypes.array,
  }

  render() {
    return (
      <div className={styles.appnav}>
        <div className={`${styles.tree} ${styles.navigation}`}>
          <ul>
            <li>
              <span className={`${styles.item} ${styles.active}`}>Example page</span>
            </li>
            <li>
              <span className={styles.item}>Standalone example page</span>
            </li>

            <li>
              <span className={`${styles.title} ${styles.closed} ${styles.item}`}>Group of pages</span>
              <ul>
                <li>
                  <a className={`${styles.item}`}>Example 1</a>
                </li>
                <li>
                  <a className={`${styles.item}`}>Example 2</a>
                </li>
                <li>
                  <a className={`${styles.item}`}>Example 3</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Menu
