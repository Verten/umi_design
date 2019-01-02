import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from '../components/text-field/Input'
import Textarea from '../components/text-field/Textarea'
import Theme from '../components/theme'

const title = 'Text fields'

storiesOf(title, module).add('default', () =>(
  <Theme>
    <Input />
  </Theme>
))

storiesOf(title, module).add('textarea', () => (
  <Theme>
    <Textarea />
  </Theme>
))