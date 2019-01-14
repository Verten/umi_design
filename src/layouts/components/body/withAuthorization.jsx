import { Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import Loading from '../../../components/loading'
import Dialog from '../../../components/dialog'

import { fetchUserInfo } from '../../../models/app'

function withAuthorization(WrappedComponent) {
  class AuthorizationComponent extends Component {
    static propTypes = {
      auth: PropTypes.object,
      actions: PropTypes.object,
    }

    constructor(props) {
      super(props)
      this.state = {
        isAuthorized: false,
        isProcessing: true,
      }
    }

    componentDidMount = () => {
      this._isMount = true
      const { auth } = this.props
      const defaultState = {
        usePostMessage: true,
        date: new Date(),
      }
      const encodeState = btoa(JSON.stringify(defaultState))
      auth.checkSession({ state: encodeState, nonce: auth.randomString() }, this.handleAuthorization)
      // todo: connect with session management
    }

    componentWillUnmount = () => {
      this._isMount = false
    }

    handleAuthorization = (error, result) => {
      // avoid set state in unmounted component
      if (this._isMount) {
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
          // start API request to fetch user info and permission
          this.props.actions.fetchUserInfo()
          // todo: fetch user permissions
        }
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
        <Dialog
          visible={true}
          title="Login Required"
          onOk={this.handleLogin}
          cancelButtonProps={{ disabled: true }}
          okText={'Login'}>
          <p>Please Login first.</p>
        </Dialog>
      )
    }
  }
  return connect(
    mapStateToProps,
    mapDispatch,
  )(AuthorizationComponent)
}

function mapStateToProps(state) {
  const { auth } = state.app
  return {
    auth,
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators({ fetchUserInfo }, dispatch),
  }
}

export default withAuthorization
