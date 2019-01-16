import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Notification from '../components/notification'
import Theme from '../components/theme'

storiesOf('Notification', module)
  .add('default', () => (
    <Theme>
      <Notification title="Simple notification component" onCloseFunc={action()} />
    </Theme>
  ))
  .add('full width', () => (
    <Theme>
      <Notification fullWidth={true} title="Multi-line notification component" onCloseFunc={action()}>
        <div>Additional tasks added by Tim to the board. Check the board for more details.</div>
      </Notification>
    </Theme>
  ))
