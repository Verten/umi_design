import React from 'react'
import { storiesOf } from '@storybook/react'
import Loading from '../components/loading'

storiesOf('Loading', module)
  .add('default', () => <Loading />)
  .add('button', () => <Loading type={'button'} />)
  .add('small size', () => <Loading size={'small'} />)
  .add('large size', () => <Loading size={'large'} />)
