import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import styles from './index.css'

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to umi!</h1>
      {props.children}
    </div>
  )
}

BasicLayout.propTypes = {
  children: PropTypes.element,
}

export default withRouter(BasicLayout)
