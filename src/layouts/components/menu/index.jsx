import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tree from '../../../components/tree'

const trees = [
  {
    name: 'Configure',
    path: '',
    tree: [{ name: 'Resources', path: '/resources' }, { name: 'Permissions', path: '/permissions' }],
  },
  {
    name: 'Manage',
    path: '',
    tree: [
      { name: 'Roles', path: '/roles' },
      { name: 'Organizations', path: '/organizations' },
      { name: 'Users', path: '/users' },
    ],
  },
  // {
  //   name: 'Menu3',
  //   path: '',
  //   tree: [
  //     { name: 'SubMenu3-1', path: '#-1' },
  //     { name: 'SubMenu3-2', path: '#-2' },
  //     { name: 'SubMenu3-3', path: '#-3' },
  //     { name: 'SubMenu3-4', path: '#-4' },
  //     {
  //       name: 'SubMenu3-5',
  //       path: '#-5',
  //       tree: [{ name: 'SubMenu3-1-1', path: '#-1-1' }, { name: 'SubMenu3-1-2', path: '#-1-2' }],
  //     },
  //   ],
  // },
]

export class Menu extends Component {
  static propTypes = {
    menu: PropTypes.array,
    location: PropTypes.object,
    getSelectedMenu: PropTypes.func,
  }

  currentSelectedMenu = () => {
    const { menu = trees, location } = this.props
    let { selectedMenu } = this.getMatchedMenu(menu, location)
    return selectedMenu.selectedMenu
  }

  currentOpenedMenu = () => {
    const { menu = trees, location } = this.props
    let { selectedMenu } = this.getMatchedMenu(menu, location)
    return selectedMenu.openedMenu
  }

  getMatchedMenu = (menu, location, parentMenu) => {
    let selectedMenu = ''
    let openedMenu = ''
    menu.forEach(_menu => {
      if (_menu.path === location.pathname) {
        selectedMenu = _menu.name
        if (parentMenu) {
          openedMenu = parentMenu
        }
      } else {
        if (_menu.tree && selectedMenu === '') {
          selectedMenu = this.getMatchedMenu(_menu.tree, location, _menu.name)
        }
      }
    })
    return { selectedMenu, openedMenu }
  }

  render() {
    return (
      <Tree
        tree={trees}
        getSelectedTree={this.props.getSelectedMenu}
        opendTree={this.currentOpenedMenu()}
        selectedTree={this.currentSelectedMenu()}
      />
    )
  }
}

export default Menu
