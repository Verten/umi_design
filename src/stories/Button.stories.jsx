import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '../components/button'
import Theme from '../components/theme'

storiesOf('Button', module)
  .add('light button', () => (
    <Theme>
      <Button onClick={action('clicked')}>Light Button</Button>
    </Theme>
  ))
  .add('primary button', () => (
    <Theme>
      <Button primary={true} onClick={action('clicked')}>
        Primary Button
      </Button>
    </Theme>
  ))
  .add('warning button', () => (
    <Theme>
      <Button warning={true} onClick={action('clicked')}>
        Warning Button
      </Button>
    </Theme>
  ))
  .add('disabled button', () => (
    <Theme>
      <Button disabled={true}>disabled Button</Button>
    </Theme>
  ))
  .add('with icon button', () => (
    <Theme>
      <Button onClick={action('clicked')} icon="icon-settings">
        Setting Button
      </Button>
    </Theme>
  ))
