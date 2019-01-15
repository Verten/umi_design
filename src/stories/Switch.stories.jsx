import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Switch from '../components/switch'
import Theme from '../components/theme'

storiesOf('Switch', module)
  .add('default', () => (
    <Theme>
      <Switch />
    </Theme>
  ))
  .add('disabled switch', () => (
    <Theme>
      <Switch disabled={true} />
    </Theme>
  ))
  .add('customize label', () => (
    <Theme>
      <Switch checked={true} checkedText={'Yes'} unCheckedText={'No'} checkFunc={action()} />
    </Theme>
  ))
