import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import Link from 'umi/link'

import styles from './home.less'

export class Home extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {}

  componentWillUnmount = () => {}

  render() {
    return (
      <Fragment>
        <div className={`${styles.info}`}>
          <h1>Welcome to IAM RBAC</h1>
          <p>Follow these steps to get started</p>
          <div>
            <p>configure</p>
            <Link to="/resources">1. Create Resource</Link>
            <Link to="/permissions">2. Create Permission</Link>
          </div>
          <div>
            <p>Manage</p>
            <Link to="/roles">3. Create Role</Link>
            <Link to="/organizations">4. Create Organization</Link>
            <Link to="/users">5. Create User</Link>
          </div>
        </div>
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
