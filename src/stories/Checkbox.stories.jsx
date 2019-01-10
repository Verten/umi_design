import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Checkbox from '../components/checkbox'
import Theme from '../components/theme'

const title = 'Checkbox'

storiesOf(title, module).add('default', () => (
  <Theme>
    <Checkbox onChange={action('checkbox change')}>Default</Checkbox>
    <Checkbox defaultChecked>Checked</Checkbox>
    <Checkbox defaultChecked disabled>Disabled Checked</Checkbox>
    <Checkbox indeterminate={true}>Indeterminate</Checkbox>
    <Checkbox indeterminate={true} disabled>Disabled Indeterminate</Checkbox>
  </Theme>
))
