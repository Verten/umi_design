import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'
import Input from '../components/text-field/Input'
import Textarea from '../components/text-field/Textarea'
import Theme from '../components/theme'

const title = 'Text fields'

class ControlledInput extends Component {
  state = { val: '' }
  changeHandler = e => {
    const val = e.target.value
    this.setState({ val })
  }
  render() {
    return (
      <Theme>
        <Input value={this.state.val} onChange={this.changeHandler} />
      </Theme>
    )
  }
}

storiesOf(title, module)
  .add('default', () =>(
    <ControlledInput />
  ))
  .add('textarea', () => (
    <Theme>
      <Textarea />
    </Theme>
  ))