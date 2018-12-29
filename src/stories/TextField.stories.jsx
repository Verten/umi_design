import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from '../components/text-field/Input'
import Textarea from '../components/text-field/Textarea'

const title = 'Text fields'

storiesOf(title, module).add('default', () => <Input />)

storiesOf(title, module).add('textarea', () => <Textarea />)