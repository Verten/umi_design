import qs from 'qs'
import error from '../helper/error'
import assert from '../helper/assert'
import windowHelper from '../helper/window'
import objectHelper from '../helper/object'
import random from '../helper/random'
import Authentication from '../authentication/authentication'
import TransactionManager from './transaction-manager'
import WebMessageHandler from './web-message-handler'

function WebAuth(options) {
  assert.check(
    options,
    { type: 'object', message: 'options parameter is not valid' },
    {
      domain: { type: 'string', message: 'domain option is required' },
      clientID: { type: 'string', message: 'clientID option is required' },
      responseType: { optional: true, type: 'string', message: 'responseType is not valid' },
      redirectUri: { optional: true, type: 'string', message: 'redirectUri is not valid' },
      scope: { optional: true, type: 'string', message: 'scope is not valid' },
    },
  )
  this.baseOptions = options
  this.client = new Authentication(this.baseOptions)
  this.transactionManager = new TransactionManager(this.baseOptions)
  this.webMessageHandler = new WebMessageHandler(this)
}

WebAuth.prototype.authorize = function(options) {
  let params = objectHelper
    .merge(this.baseOptions, ['clientID', 'responseType', 'redirectUri', 'scope', 'state', 'nonce'])
    .with(options)

  assert.check(
    params,
    { type: 'object', message: 'options parameter is not valid' },
    {
      responseType: { type: 'string', message: 'responseType option is required' },
    },
  )

  params = this.transactionManager.process(params)
  params.scope = params.scope || 'openid profile email'

  windowHelper.redirect(this.client.buildAuthorizeUrl(params))
}

WebAuth.prototype.checkSession = function(options, cb) {
  let params = objectHelper
    .merge(this.baseOptions, ['clientID', 'responseType', 'redirectUri', 'scope', 'state', 'nonce'])
    .with(options)

  assert.check(
    params,
    { type: 'object', message: 'options parameter is not valid' },
    {
      state: { type: 'string', message: 'state option is required' },
    },
  )

  params = this.transactionManager.process(params)

  if (!params.redirectUri) {
    return cb({ error: 'error', error_description: "redirectUri can't be empty" })
  }

  assert.check(params, { type: 'object', message: 'options parameter is not valid' })
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' })

  params = objectHelper.blacklist(params, ['usePostMessage', 'tenant', 'postMessageDataType'])
  this.webMessageHandler.run(params, cb)
}

WebAuth.prototype.sessionManagement = function(options, cb) {
  let params = objectHelper.merge(this.baseOptions, ['clientID']).with(options)

  params.webMessageType = 'session_management'

  assert.check(
    params,
    { type: 'object', message: 'options parameter is not valid' },
    {
      intervalTime: { type: 'number', message: 'intervalTime option is required' },
    },
  )
  assert.check(cb, { type: 'function', message: 'cb parameter is not valid' })

  params.timeout = params.intervalTime || 30 * 1000

  this.webMessageHandler.run(params, cb)
}

WebAuth.prototype.parseHash = function(options, cb) {
  let parsedQs
  let err

  if (!cb && typeof options === 'function') {
    cb = options
    options = {}
  } else {
    options = options || {}
  }

  let _window = window

  let hashStr = options.hash === undefined ? _window.location.search : options.hash
  hashStr = hashStr.replace(/^\??\/?/, '')

  parsedQs = qs.parse(hashStr)

  if (parsedQs.hasOwnProperty('error')) {
    err = error.buildResponse(parsedQs.error, parsedQs.error_description)
    if (parsedQs.state) {
      err.state = parsedQs.state
    }
    return cb(err)
  }
  return this.validateAuthenticationResponse(options, parsedQs, cb)
}

WebAuth.prototype.logout = function(options) {
  windowHelper.redirect(this.client.buildLogoutUrl(options))
}

WebAuth.prototype.validateAuthenticationResponse = function(options, parsedHash, cb) {
  let state = parsedHash.state
  let transaction = this.transactionManager.getStoredTransaction(state)
  let transactionState = options.state || (transaction && transaction.state) || null

  let transactionStateMatchesState = transactionState === state
  let shouldBypassStateChecking = !state && !transactionState

  if (!shouldBypassStateChecking && !transactionStateMatchesState) {
    return cb({
      state,
      error: 'invalid_token',
      errorDescription: '`state` does not match.',
    })
  }

  let callback = function(err, payload) {
    if (err) {
      return cb(err)
    }
    return cb(null, buildParseHashResponse(parsedHash))
  }

  return callback(null, null)
}

WebAuth.prototype.initAuthorizationResponse = function(message) {
  return {
    type: 'authorization_response', // must be this type
    response: {
      ...objectHelper.toSnakeCase(message),
    },
  }
}

WebAuth.prototype.random = random

function buildParseHashResponse(qsParams) {
  return {
    accessToken: qsParams.access_token || null,
    idToken: qsParams.id_token || null,
    state: qsParams.state || null,
    expiresIn: qsParams.expires_in ? parseInt(qsParams.expires_in, 10) : null,
    tokenType: qsParams.token_type || null,
    scope: qsParams.scope || null,
    sessionState: qsParams.session_state || null,
  }
}

export default WebAuth
