import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Header from './components/header'
import Body from './components/body'

function BasicLayout(props) {
  if (props.location.pathname === '/' || props.location.pathname === '/callback') {
    return (
      <Fragment>
        <Header />
        <div>{props.children}</div>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Header />
      <Body {...props}>{props.children}</Body>
    </Fragment>
  )
}

BasicLayout.propTypes = {
  children: PropTypes.element,
}

export default withRouter(BasicLayout)
