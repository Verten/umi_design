import router from 'umi/router'
import auth from '../../auth/web-auth/auth'

export default class Auth {
  auth = new auth({
    domain: 'localhost:3000', // test authorize endpoint by nodejs
    clientID: 'accountManagerAPP',
    redirectUri: 'http://localhost:8000/callback',
    responseType: 'code',
    scope: 'openid',
  })

  keyLength = 32

  constructor() {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.checkSession = this.checkSession.bind(this)
    this.randomString = this.randomString.bind(this)
    this.handleAuthenticateResponse = this.handleAuthenticateResponse.bind(this)
    this.initPostAuthorizationResponse = this.initPostAuthorizationResponse.bind(this)
  }

  login(options) {
    this.auth.authorize(options)
  }

  handleAuthenticateResponse(cb) {
    this.auth.parseHash((error, result) => {
      cb(error, result)
    })
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('session_state', authResult.sessionState)
  }

  checkSession(options, cb) {
    this.auth.checkSession(options, (error, result) => {
      cb(error, result)
    })
  }

  connectWithSessionManagement(cb) {
    const intervalTime = 30 * 1000
    if (localStorage.getItem('session_state') !== null && localStorage.getItem('session_state') !== '') {
      setInterval(() => {
        this.auth.sessionManagement({ intervalTime }, (error, result) => {
          cb(error, result)
        })
      }, intervalTime)
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  logout(options) {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('session_state')
    this.auth.logout(options)
    // navigate to the root route
    router.replace('/')
  }

  initPostAuthorizationResponse(message) {
    return this.auth.initAuthorizationResponse(message)
  }

  randomString(keyLength = this.keyLength) {
    return this.auth.random.randomString(keyLength)
  }
}
