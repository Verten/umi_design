import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Dialog from '../components/dialog'
import Theme from '../components/theme'

storiesOf('Dialog', module)
  .add('default', () => (
    <Theme>
      <Dialog visible={true} title="Default Dialog" onOk={action('onOk')} onCancel={action('onCancel')}>
        <p>This is sample content</p>
      </Dialog>
    </Theme>
  ))
  .add('customize label', () => (
    <Theme>
      <Dialog
        visible={true}
        title="Customize Label Dialog"
        onOk={action('onOk')}
        onCancel={action('onCancel')}
        okText={'Submit'}
        cancelText={'Cancel'}>
        <input />
      </Dialog>
    </Theme>
  ))
  .add('warning dialog', () => (
    <Theme>
      <Dialog
        type="warning"
        okButtonProps={{ disabled: true }}
        visible={true}
        title="Warning"
        onOk={action('onOk')}
        onCancel={action('onCancel')}>
        <p>This is sample content</p>
      </Dialog>
    </Theme>
  ))
