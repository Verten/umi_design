import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles/styles.less'

export class Accordion extends Component {
  static propTypes = {
    data: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  renderContent() {
    const { data } = this.props
    const content = []
    data.forEach((_data, index) => {
      content.push(
        <li key={index}>
          <div className={styles.title}>{_data.title}</div>
          <div className={styles.content}>
            <p>{_data.description}</p>
          </div>
        </li>,
      )
    })
    return content
  }

  render() {
    return (
      <div className={styles.light}>
        <div className={styles.accordion}>
          <ul>{this.renderContent()}</ul>
        </div>
      </div>
    )
  }
}

export default Accordion
