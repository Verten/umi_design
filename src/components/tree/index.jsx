import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.less'

/**
 * tree: [
 *  {
 *    name: 'Menu1',
 *    path: '/Path1'
 *  }, {
 *    name: 'Menu2',
 *    path: '/Path2'
 *  }, {
 *  name: 'Menu3',
 *  path: '/Path3',
 *  tree: [
 *    {name: 'SubMenu3-1', path: '/Path3-1'},
 *    {name: 'SubMenu3-2', path: '/Path3-2'},
 *    {name: 'SubMenu3-3', path: '/Path3-3'},
 *    {name: 'SubMenu3-4', path: '/Path3-4'}
 *  ]
 * }]
 *
 */

export class Tree extends Component {
  static propTypes = {
    tree: PropTypes.array,
    getSelectedMenu: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuStatus: {},
      activateMenuItem: null,
    }
  }

  handleClickMenu(e, menuName) {
    const { menuStatus } = this.state
    menuStatus[menuName] = !menuStatus[menuName]
    this.setState({
      menuStatus,
      activateMenuItem: menuName,
    })
    if (this.props.getSelectedMenu) {
      this.props.getSelectedMenu(menuName)
    }
  }

  renderMenu(tree) {
    const menu = []
    tree.forEach(_tree => {
      if (typeof _tree === 'object') {
        if (typeof _tree.tree === 'object' && _tree.tree.length > 0) {
          menu.push(
            <li key={_tree.name}>
              <span
                className={`${styles.title} ${this.state.menuStatus[_tree.name] ? styles.opened : ''} ${styles.item}`}
                onClick={e => this.handleClickMenu(e, _tree.name)}>
                {_tree.name}
              </span>
              {this.renderMenu(_tree.tree)}
            </li>,
          )
        } else {
          menu.push(
            <li key={_tree.name}>
              <a
                className={`${styles.item} ${this.state.activateMenuItem === _tree.name ? styles.active : ''}`}
                href={_tree.path}
                onClick={e => this.handleClickMenu(e, _tree.name)}>
                {_tree.name}
              </a>
            </li>,
          )
        }
      }
    })
    return <ul>{menu}</ul>
  }

  render() {
    const { theme = 'light', tree } = this.props
    return (
      <div className={styles[theme]}>
        <div className={`${styles.tree} ${styles.navigation}`}>{this.renderMenu(tree)}</div>
      </div>
    )
  }
}

export default Tree
