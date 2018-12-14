import React from 'react'
import { storiesOf } from '@storybook/react'
import Pagination from '../components/pagination'

storiesOf('Pagination', module)
  .add('default', () => <Pagination totalSize={78} pageSize={15} />)
  .add('more data 1', () => <Pagination totalSize={100} pageSize={9} />)
  .add('more data 2', () => <Pagination totalSize={1000} pageSize={19} />)
