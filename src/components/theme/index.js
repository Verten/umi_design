import React, { Component } from 'react'

export default class Theme extends Component {
  render() {
    const { children, theme = 'light' } = this.props
    return (
      <div className={theme}>{ children }</div>
    )
  }
}
