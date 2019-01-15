import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './styles/styles.less'

export class Accordion extends Component {
  static propTypes = {
    data: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this.state = {
      openedAccordionIndex: [],
    }
  }

  triggerAccordionOpen = accordionIndex => {
    let { openedAccordionIndex } = this.state
    if (!openedAccordionIndex.includes(accordionIndex)) {
      openedAccordionIndex.push(accordionIndex)
    } else {
      const _tmp = openedAccordionIndex.map(_openedIndex => {
        if (_openedIndex !== accordionIndex) {
          return _openedIndex
        }
      })
      openedAccordionIndex = _tmp
    }
    this.setState({
      openedAccordionIndex,
    })
  }

  renderContent = () => {
    const { data } = this.props
    const { openedAccordionIndex } = this.state
    const content = []
    data.forEach((_data, index) => {
      content.push(
        <li
          key={index}
          onClick={() => this.triggerAccordionOpen(index)}
          className={`${openedAccordionIndex.includes(index) ? 'opened' : ''}`}>
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
      <div className={styles.accordion}>
        <ul>{this.renderContent()}</ul>
      </div>
    )
  }
}

export default Accordion
