import React, { Component } from 'react'
import { connect } from 'dva'
import router from 'umi/router'
import PropTypes from 'prop-types'
import Loading from '../../components/loading'

export class Callback extends Component {
  static propTypes = {
    auth: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  handleAuthentication = () => {
    const { location, auth } = this.props
    if (/access_token|id_token|error/.test(location.search)) {
      auth.handleAuthenticateResponse(this.handleResponse)
    }
  }

  handleResponse = (error, result) => {
    const { auth } = this.props
    let postMessageBody = null
    if (error) {
      postMessageBody = error
    } else {
      auth.setSession(result)
      postMessageBody = result
    }
    this.handleLogicWithState(postMessageBody)
  }

  /**
   * Handle using post message or redirect logic with state
   *
   * @method handleLogicWithState
   * @param {Object} message
   * @param {String} message.accessToken
   * @param {String} message.expiresIn
   * @param {String} message.idToken
   * @param {String} message.state
   * @param {String} message.error
   * @param {String} message.errorDescription
   */
  handleLogicWithState = message => {
    const { state } = message
    const { auth } = this.props
    const targetOrigin = `${window.location.origin}`
    const mainWin = window.opener ? window.opener : window.parent
    let decodedState = ''
    if (state) {
      try {
        decodedState = JSON.parse(atob(state))
      } catch (e) {
        this.redirectWithError(e)
      }
      if (decodedState !== '') {
        const { usePostMessage, path } = decodedState
        if (!usePostMessage) {
          router.replace({
            pathname: path,
          })
        } else {
          mainWin.postMessage(auth.initPostAuthorizationResponse(message), targetOrigin)
        }
      }
    }
  }

  redirectWithError = error => {
    router.replace({
      pathname: '/', // to landing page show error information
      query: {
        ...error,
      },
    })
  }

  componentDidMount = () => {
    this.handleAuthentication()
  }

  render() {
    return (
      <div>
        <Loading size="large" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state.app
  return {
    auth,
  }
}

export default connect(mapStateToProps)(Callback)
