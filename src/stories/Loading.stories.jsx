import React from 'react'
import { storiesOf } from '@storybook/react'
import Loading from '../components/loading'
import Theme from '../components/theme'

storiesOf('Loading', module)
  .add('default', () => (
    <Theme>
      <Loading />
    </Theme>
  ))
  .add('button', () => (
    <Theme>
      <Loading type={'button'} />
    </Theme>
  ))
  .add('small size', () => (
    <Theme>
      <Loading size={'small'} />
    </Theme>
  ))
  .add('large size', () => (
    <Theme>
      <Loading size={'large'} />
    </Theme>
  ))
