import React from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from '../components/checkbox'
import Theme from '../components/theme'

const title = 'Checkbox'

storiesOf(title, module).add('default', () => (
  <Theme>
    <Checkbox onChange={e => console.log(e.target.checked)}>Default</Checkbox>
    <Checkbox checked>Checked</Checkbox>
    <Checkbox checked disabled>Disabled Checked</Checkbox>
    <Checkbox indeterminate={true}>Indeterminate</Checkbox>
    <Checkbox indeterminate={true} disabled>Disabled Indeterminate</Checkbox>
  </Theme>
))
