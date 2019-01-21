import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Form from '../components/form'
import Input from '../components/text-field/Input'
import Button from '../components/button'
import Theme from '../components/theme'

storiesOf('Form', module)
  .add('default', () => {
    // const initialValues = { email: '', password: '', age: '' }
    const validators = [
      { name: 'email',
        required: true,
        rule: /\w+@\w+.\w+/,
        errorMessage: ({ errorType }) => (
          errorType === 'required' ? 'Email is required' : 'Email is invalid'
        ),
      },
      { name: 'password',
        required: true,
        rule: /^[0-9]+$/,
        errorMessage: ({ errorType }) => (
          errorType === 'required' ? 'Password is required' : 'Password is invalid'
        ),
      },
      { name: 'age',
        rule: /^[0-9]+$/,
        errorMessage: 'Age is invalid',
      },
    ]
    const onSubmit = ({ values, setSubmitting  }) => {
      setSubmitting(true) 
      setTimeout(() => {
        action('submitData')(values)
        setSubmitting(false)
      }, 1000)
    }
    const showErrorCls = condition => ({ display: condition ? 'inline-block' : 'none', color: '#f00' })
    return (
      <Theme>
        <Form validators={validators} onSubmit={onSubmit} >
          {({ errors, handleChange }) => {
            return (
              <div style={{ padding: '20px' }}>
                <div>
                  <Input autoComplete="off" label={{ text: '*Email:' }} onChange={handleChange} name="email" />
                  <span style={showErrorCls(errors.email)}>{errors.email}</span>
                </div>
                <div>
                  <Input autoComplete="off" label={{ text: '*Password:' }} onChange={handleChange} name="password" />
                  <span style={showErrorCls(errors.password)}>{errors.password}</span>
                </div>
                <div>
                  <Input autoComplete="off" label={{ text: 'Age:' }} onChange={handleChange} name="age" />
                  <span style={showErrorCls(errors.age)}>{errors.age}</span>
                </div>
                <br/>
                <Button type="submit">Submit</Button>
              </div>
            )
          }}
        </Form>
      </Theme>
    )
  })