import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Dropdown from '../components/dropdown'
import Theme from '../components/theme'

storiesOf('Dropdown', module)
  .add('default', () => (
    <Theme>
      <Dropdown
        label={'Page Size'}
        operationName={'10'}
        operationItem={[10, 15, 20, 50, 100]}
        itemChange={action('item change')}
      />
    </Theme>
  ))
  .add('no label', () => (
    <Theme>
      <Dropdown
        operationName={'15'}
        operationItem={[10, 15, 20, 50, 100]}
        itemChange={action('item change')}
      />
    </Theme>
  ))
