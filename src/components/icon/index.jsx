import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles/styles.less'

const Icon = props => {
  const { icon, clickFunc, className } = props
  return (
    <div className={styles['icon-wrapper']}>
      <i className={`${styles.icon} ${styles[icon]} ${className}`} onClick={clickFunc} />
    </div>
  )
}

Icon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  clickFunc: PropTypes.func,
}

export default Icon
