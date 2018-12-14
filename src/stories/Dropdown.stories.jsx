import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Dropdown from '../components/dropdown'

storiesOf('Dropdown', module)
  .add('default', () => (
    <Dropdown
      label={'Page Size'}
      operationName={'10'}
      operationItem={[10, 15, 20, 50, 100]}
      itemChange={action('item change')}
    />
  ))
  .add('no label', () => (
    <Dropdown operationName={'15'} operationItem={[10, 15, 20, 50, 100]} itemChange={action('item change')} />
  ))
