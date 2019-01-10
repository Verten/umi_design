import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Header from './components/header'
import Body from './components/body'

function BasicLayout(props) {
  if (props.location.pathname === '/' || props.location.pathname === '/callback') {
    return <div>{props.children}</div>
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
