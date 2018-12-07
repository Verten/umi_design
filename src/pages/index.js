import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.css'
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
    const { auth } = this.props
    const encodeState = btoa(
      JSON.stringify({
        usePostMessage: false,
        date: new Date(),
        path: 'home',
      }),
    )
    return () => {
      auth.login({ state: encodeState, nonce: auth.randomString() })
    }
  }

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>
            <Button icon="icon-avatar" onClick={this.handleLogin()}>
              Login Button
            </Button>
          </li>
        </ul>
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
