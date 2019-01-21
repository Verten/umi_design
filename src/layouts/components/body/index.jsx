import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withAuthorization from './withAuthorization'
import { multiLanguage } from '../../../utilities/helper'
import Menu from '../menu'

import styles from './styles/index.less'

export class Body extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.element,
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedMenu: '',
      slideOpen: true,
    }
  }

  handleSelectedMenu = selectedMenu => {
    this.setState({
      selectedMenu,
    })
  }

  toggleSlideMenu = e => {
    this.setState({
      slideOpen: !this.state.slideOpen,
    })
  }

  render() {
    return (
      <main>
        <div className={`${styles.app} ${styles['slide-right']}`}>
          <nav className={styles.appbar}>
            <div className={styles['actions-left']} onClick={this.toggleSlideMenu}>
              <div className={styles.item}>
                <i className={`${styles['navigation-toggle']} ${this.state.slideOpen ? styles.closed : ''}`} />
              </div>
              <div className={`${styles['menu-anchor']} ${this.state.slideOpen ? styles['open-menu'] : ''}`}>
                {multiLanguage('MENU')}
              </div>
              <div className={`${styles.title} ${this.state.slideOpen ? styles['open-menu'] : ''}`}>
                <span className={`${styles['title-name']}`}>{this.state.selectedMenu}</span>
              </div>
            </div>
            <div className={`${styles['actions-right']}`} />
          </nav>
          <div className={styles.appbody}>
            <div className={`${styles.appnav} ${this.state.slideOpen ? '' : styles.hidden}`}>
              <Menu location={this.props.location} getSelectedMenu={this.handleSelectedMenu} />
            </div>
            <div className={styles.appcontent}>{this.props.children}</div>
          </div>
        </div>
      </main>
    )
  }
}

export default withAuthorization(Body)
