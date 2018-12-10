import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import Button from '../../components/button'

export class Home extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: props.auth.isAuthenticated(),
    }
  }

  handleLogout = () => {
    this.props.auth.logout({
      postLogoutRedirectUri: 'https://localhost:3000/logout',
      idTokenHint: localStorage.getItem('id_token'),
    })
  }

  fetchUserInfo = (error, result) => {
    if (error) {
      console.info(`fetchUserInfo with error:`, error)
    } else {
      console.info(`fetchUserInfo with result:`, result)
      this.setState({
        isAuthenticated: true,
      })
    }
  }

  sessionManagement = (error, result) => {
    if (error) {
      console.info(`sessionManagement with error:`, error)
    } else {
      console.info(`sessionManagement with result:`, result)
    }
  }

  componentDidMount = () => {
    const { auth } = this.props
    const encodeState = btoa(
      JSON.stringify({
        usePostMessage: true,
        date: new Date(),
      }),
    )
    auth.checkSession({ state: encodeState }, this.fetchUserInfo)
    auth.connectWithSessionManagement(this.sessionManagement)
  }

  render() {
    return (
      <Fragment>
        <div>Home Page</div>
        {this.state.isAuthenticated ? (
          <Button icon="icon-avatar" onClick={this.handleLogout}>
            Log Out
          </Button>
        ) : null}
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { auth } = state.app
  return {
    auth,
  }
}

export default connect(mapStateToProps)(Home)
