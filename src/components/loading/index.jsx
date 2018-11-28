import React from 'react'
import { isEqual } from 'lodash'
import PropTypes from 'prop-types'
import styles from './loading.less'
import './loading-dark.less'
import './loading-light.less'

const Loading = props => {
  const { type = 'div', size = 'medium' } = props
  let element = null
  if (isEqual(type, 'div')) {
    element = <div className={`${styles.loading} ${styles[size]}`} />
  } else {
    element = <button className={`${styles.btn} ${styles.loading} ${styles[size]}`} />
  }
  return element
}

Loading.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
}

Loading.defaultProps = {
  type: 'div',
  size: 'medium',
}

export default Loading
