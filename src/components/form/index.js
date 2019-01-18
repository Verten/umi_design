import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Form extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    validators: PropTypes.array,
    onSubmit: PropTypes.func,
  }
  constructor(props) {
    super(props)
    const { initialValues = {} } = props
    const touched = this.initTouched()
    this.state = {
      values: initialValues,
      errors: {},
      submitting: false,
      touched,
    }
  }
  initTouched = () => {
    const { validators = [] } = this.props
    const touched = validators.reduce((initialTouched, field) => {
      if (field.required) {
        initialTouched[field.name] = false
      }
      return initialTouched
    }, {})
    return touched
  }
  setSubmitting = (submitting) => {
    this.setState({ submitting })
  }
  changeValue = (name, value) => {
    const values = {
      ...this.state.values,
      [name]: value
    }
    const errors = this.validate(name, value, this.state.errors)
    const touched = { ...this.state.touched, [name]: true }
    this.setState({ values, errors, touched })
  }
  handleChange = e => {
    const value = e.target.value
    const name = e.target.attributes.name.nodeValue
    this.changeValue(name, value)
  }
  validate = (fieldName, fieldValue, prevErrors) => {
    const { validators = [] } = this.props
    const errors = { ...prevErrors }
    const validator = validators.find(field => field.name === fieldName)
    if (typeof validator === 'object') {
      const { name, rule, errorMessage, required } = validator
      const isRegExp = Object.prototype.toString.call(rule) === '[object RegExp]'
      const invalid = !rule.test(fieldValue)
      const handleErrors = errorType => {
        errors[name] = typeof errorMessage === 'function'
          ? errorMessage({ errorType }) : errorMessage
      }
      if (fieldValue && isRegExp && invalid) {
        handleErrors('invalid')
        return errors
      }
      if(required && !fieldValue) {
        handleErrors('required')
        return errors
      } 
      delete errors[name]
    }
    return errors
  }
  validateAll = () => {
    const { touched = {}, values } = this.state
    const { validators } = this.props
    const touchedAll = Object.keys(touched).some(filedName => touched[filedName] === true)
    const errors = validators.reduce((result, validator) => {
      const fieldName = validator.name
      return this.validate(fieldName, values[fieldName], result)
    }, this.state.errors)
    return { errors, canSubmit: touchedAll && Object.keys(errors).length === 0 }
  }
  filterValues = (rawValues) => {
    const values = {...rawValues}
    const fields = Object.keys(values)
    const filteredValues = fields.reduce((cur, field) => {
      const fieldValue = values[field]
      if (fieldValue) {
        cur[field] = fieldValue
      }
      return cur
    }, {})
    return filteredValues
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.submitting) {
      const { onSubmit } = this.props
      const validateResult = this.validateAll()
      if (validateResult.canSubmit) {
        const values = this.filterValues(this.state.values)  
        onSubmit({ values, setSubmitting: this.setSubmitting })
      } else {
        this.setState({ errors: validateResult.errors })
      }
    }
  }
  render() {
    const { children } = this.props
    const params = {
      errors: this.state.errors,
      handleChange: this.handleChange,
      changeValue: this.changeValue,
    }
    return (
      <form onSubmit={this.handleSubmit}>
        { typeof children === 'function' && children(params) }
      </form>
    )
  }
}
