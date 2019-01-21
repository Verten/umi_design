import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tree from '../../../components/tree'
import { multiLanguage } from '../../../utilities/helper'

const trees = [
  {
    name: multiLanguage('CONFIGURE'),
    path: '',
    tree: [
      { name: multiLanguage('RESOURCES'), path: '/resources' },
      { name: multiLanguage('PERMISSIONS'), path: '/permissions' },
    ],
  },
  {
    name: multiLanguage('MANAGE'),
    path: '',
    tree: [
      { name: multiLanguage('ROLES'), path: '/roles' },
      { name: multiLanguage('ORGANIZATIONS'), path: '/organizations' },
      { name: multiLanguage('USERS'), path: '/users' },
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
    let selectedMenu = this.getMatchedSelectedMenu(menu, location)
    return selectedMenu
  }

  currentOpenedMenu = () => {
    const { menu = trees, location } = this.props
    let openedMenu = this.getMatchedOpenedMenu(menu, location)
    return openedMenu
  }

  getMatchedOpenedMenu = (menu, location, parendMenu) => {
    let openedMenu = ''
    menu.forEach(_menu => {
      if (_menu.path === location.pathname) {
        if (parendMenu) {
          openedMenu = parendMenu
        }
      } else {
        if (_menu.tree && openedMenu === '') {
          openedMenu = this.getMatchedOpenedMenu(_menu.tree, location, _menu.name)
        }
      }
    })
    return openedMenu
  }

  getMatchedSelectedMenu = (menu, location) => {
    let selectedMenu = ''
    menu.forEach(_menu => {
      if (_menu.path === location.pathname) {
        selectedMenu = _menu.name
      } else {
        if (_menu.tree && selectedMenu === '') {
          selectedMenu = this.getMatchedSelectedMenu(_menu.tree, location)
        }
      }
    })
    return selectedMenu
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
