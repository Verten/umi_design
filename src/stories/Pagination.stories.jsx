import React from 'react'
import { storiesOf } from '@storybook/react'
import Pagination from '../components/pagination'
import Theme from '../components/theme'

storiesOf('Pagination', module)
  .add('default', () => (
    <Theme>
      <Pagination
        totalSize={78}
        pageSize={15}
        showQuickJumper={true}
        showSizeChanger={true} />
    </Theme>
  ))
  .add('more data 1', () => (
    <Theme>
      <Pagination
        totalSize={100}
        pageSize={9}
        showQuickJumper={true}
        showSizeChanger={true} />
    </Theme>
  ))
  .add('more data 2', () => (
    <Theme>
      <Pagination
        totalSize={1000}
        pageSize={19}
        defaultCurrent={1}
        showQuickJumper={true}
        showSizeChanger={true} />
    </Theme>
  ))
