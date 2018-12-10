import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import Header from './components/header'

import styles from './index.css'

function BasicLayout(props) {
  return (
    <Fragment>
      <Header />
      <div className={styles.normal}>{props.children}</div>
    </Fragment>
  )
}

BasicLayout.propTypes = {
  children: PropTypes.element,
}

export default withRouter(BasicLayout)
