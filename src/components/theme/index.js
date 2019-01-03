import React from 'react'
import styles from '../../assets/common/common.less'

export default function Theme(props) {
  const { children, theme = 'light' } = props
  return (
    <div className={theme}>{children}</div>
  )
}
