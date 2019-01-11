import { Component } from 'react'
import { connect } from 'dva'
import Loading from '../../../components/loading'
import Button from '../../../components/button'

function withAuthorization(WrappedComponent) {
  class AuthorizationComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isAuthorized: false,
        isProcessing: true,
      }
    }

    componentDidMount = () => {
      const { auth } = this.props
      const defaultState = {
        usePostMessage: true,
        date: new Date(),
      }
      const encodeState = btoa(JSON.stringify(defaultState))
      auth.checkSession({ state: encodeState, nonce: auth.randomString() }, this.handleAuthorization)
    }

    handleAuthorization = (error, result) => {
      if (error) {
        this.setState({
          isAuthorized: false,
          isProcessing: false,
        })
      } else {
        this.setState({
          isAuthorized: true,
          isProcessing: false,
        })
      }
    }

    handleLogin = () => {
      const { auth, location } = this.props
      const to = location.pathname
      const defaultState = {
        usePostMessage: false,
        date: new Date(),
        path: 'home',
      }
      if (to) {
        Object.assign(defaultState, { path: to })
      }
      const encodeState = btoa(JSON.stringify(defaultState))
      auth.login({ state: encodeState, nonce: auth.randomString() })
    }

    render() {
      const { isProcessing, isAuthorized } = this.state
      return isProcessing ? (
        <Loading />
      ) : isAuthorized ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Button icon="icon-avatar" onClick={this.handleLogin}>
          Login Button
        </Button>
      )
    }
  }
  return connect(mapStateToProps)(AuthorizationComponent)
}

function mapStateToProps(state) {
  const { auth } = state.app
  return {
    auth,
  }
}

export default withAuthorization
