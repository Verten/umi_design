import React from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from '../components/checkbox'
import Theme from '../components/theme'

const title = 'Checkbox'

storiesOf(title, module).add('default', () => (
  <Theme>
    <Checkbox label="Default" />
    <Checkbox label="Checked" checked/>
    <Checkbox label="Disabled Checked" checked disabled/>
    <Checkbox label="Indeterminate" indeterminate={true} />
    <Checkbox label="Disabled Indeterminate" indeterminate={true} disabled />
  </Theme>
))
