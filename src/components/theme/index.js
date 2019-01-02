import React from 'react'

export default function Theme(props) {
  const { children, theme = 'light' } = props
  return (
    <div className={theme}>{children}</div>
  )
}
