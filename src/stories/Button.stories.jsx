import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../components/button'
import styles from '../assets/font/icon-font.less'
import iconStyles from '../assets/font/icons.less'

storiesOf('Button', module)
  .add('light button', () => <Button onClick={action('clicked')}>Light Button</Button>)
  .add('dark button', () => (
    <Button theme={'dark'} onClick={action('clicked')}>
      Light Button
    </Button>
  ))
  .add('primary button', () => (
    <Button primary={true} onClick={action('clicked')}>
      Primary Button
    </Button>
  ))
  .add('warning button', () => (
    <Button warning={true} onClick={action('clicked')}>
      Warning Button
    </Button>
  ))
  .add('disabled button', () => <Button disabled={true}>Warning Button</Button>)
  .add('with icon button', () => (
    <Button onClick={action('clicked')} icon='icon-settings'>
      Setting Button
    </Button>
  ))
