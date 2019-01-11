import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Theme from '../components/theme'

import Header from './components/header'
import Body from './components/body'

function BasicLayout(props) {
  if (props.location.pathname === '/' || props.location.pathname === '/callback') {
    return (
      <Theme>
        <Header />
        <div>{props.children}</div>
      </Theme>
    )
  }
  return (
    <Theme>
      <Header />
      <Body {...props}>{props.children}</Body>
    </Theme>
  )
}

BasicLayout.propTypes = {
  children: PropTypes.element,
}

export default withRouter(BasicLayout)
