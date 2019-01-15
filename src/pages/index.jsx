import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import Button from '../components/button'

export class LandingPage extends Component {
  static propTypes = {
    auth: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {}
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(state) {
    const { auth, location } = this.props
    const to = location.query.to
    const defaultState = {
      usePostMessage: false,
      date: new Date(),
      path: 'home',
    }
    if (to) {
      Object.assign(defaultState, { path: to })
    }
    const encodeState = btoa(JSON.stringify(defaultState))
    return () => {
      auth.login({ state: encodeState, nonce: auth.randomString() })
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={`${styles.info}`}>
          <h1>IAM RBAC</h1>
          <p>
            The IAM RBAC provides... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate sapien
            sed pulvinar aliquam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vulputate sapien sed
            pulvinar aliquam.
          </p>
          <div>
            <Button primary={true} onClick={this.handleLogin()}>
              Sign in
            </Button>
          </div>
        </div>
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

export default connect(mapStateToProps)(LandingPage)
