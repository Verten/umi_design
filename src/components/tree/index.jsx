import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './styles.less'
import { Object } from 'es6-shim'

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
    theme: PropTypes.string,
    tree: PropTypes.array,
    selectedTree: PropTypes.string,
    opendTree: PropTypes.string,
    getSelectedTree: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      menuStatus: this.initOpenTree(props),
      activateMenuItem: props.selectedTree,
    }
  }

  initOpenTree(props) {
    return props.opendTree ? { [props.opendTree]: true } : {}
  }

  handleClickMenu(e, menuName, menuType) {
    const { menuStatus } = this.state
    const nextState = {
      menuStatus,
    }
    if (menuType === 'menu-item') {
      Object.assign(nextState, {
        activateMenuItem: menuName,
      })
      if (this.props.getSelectedTree) {
        this.props.getSelectedTree(menuName)
      }
    } else if (menuType === 'menu') {
      menuStatus[menuName] = !menuStatus[menuName]
    }
    this.setState(nextState)
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
                onClick={e => this.handleClickMenu(e, _tree.name, 'menu')}>
                {_tree.name}
              </span>
              {this.renderMenu(_tree.tree)}
            </li>,
          )
        } else {
          menu.push(
            <li key={_tree.name}>
              <Link
                className={`${styles.item} ${this.state.activateMenuItem === _tree.name ? styles.active : ''}`}
                to={_tree.path}
                onClick={e => this.handleClickMenu(e, _tree.name, 'menu-item')}>
                {_tree.name}
              </Link>
            </li>,
          )
        }
      }
    })
    return <ul>{menu}</ul>
  }

  componentDidMount() {
    if (this.props.getSelectedTree && this.props.selectedTree) {
      this.props.getSelectedTree(this.props.selectedTree)
    }
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
