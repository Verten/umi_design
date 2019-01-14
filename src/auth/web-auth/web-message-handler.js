import IframeHandler from '../helper/iframe-handler'
import objectHelper from '../helper/object'
import windowHelper from '../helper/window'
import random from '../helper/random'
import Warn from '../helper/warn'

function runWebMessageFlow(targetUrl, options, callback, validatorCallback, message) {
  const handler = new IframeHandler({
    url: targetUrl,
    message: {
      targetUrl,
      message,
    },
    webMessageType: options.webMessageType,
    eventListenerType: 'message',
    callback: function(eventData) {
      callback(null, eventData)
    },
    timeout: options.timeout,
    eventValidator: {
      isValid: validatorCallback(options),
    },
    timeoutCallback: function() {
      callback({
        error: 'timeout',
        error_description: 'Timeout during executing web_message communication',
        state: options.state,
      })
    },
  })
  handler.init()
}

function WebMessageHandler(webAuth) {
  this.webAuth = webAuth
  this.warn = new Warn(webAuth.baseOptions)
}

WebMessageHandler.prototype.run = function(options, cb) {
  let _this = this
  options.prompt = 'none'
  let webMessageType = 'authorize'

  if (options.webMessageType === 'session_management') {
    webMessageType = options.webMessageType
  }

  let currentOrigin = windowHelper.getOrigin()
  let redirectUriOrigin = objectHelper.getOriginFromUrl(options.redirectUri)
  if (redirectUriOrigin && currentOrigin !== redirectUriOrigin && webMessageType === 'authorize') {
    return cb({
      error: 'origin_mismatch',
      error_description:
        "The redirectUri's origin (" +
        redirectUriOrigin +
        ") should match the window's origin (" +
        currentOrigin +
        ').',
    })
  }

  if (webMessageType === 'authorize') {
    runWebMessageFlow(
      this.webAuth.client.buildAuthorizeUrl(options),
      options,
      checkAuthorizeCallback(options, _this, cb),
      checkAuthorizeValidator,
    )
  } else if (webMessageType === 'session_management') {
    if (localStorage.getItem('session_state') !== null && localStorage.getItem('session_state') !== '') {
      runWebMessageFlow(
        this.webAuth.client.buildSessionManagementUrl(options),
        options,
        checkSessionManagementCallback(options, _this, cb),
        checkSessionManagementValidator,
        `${options.clientID} ${localStorage.getItem('session_state')}`,
      )
    }
  }
}

function checkAuthorizeValidator(options) {
  return eventData => {
    return (
      eventData.event.data.type === 'authorization_response' && options.state === eventData.event.data.response.state
    )
  }
}

function checkSessionManagementValidator(options) {
  return eventData => {
    return (
      eventData.event.data === 'error' || eventData.event.data === 'unchanged' || eventData.event.data === 'changed'
    )
  }
}

function checkAuthorizeCallback(options, obj, cb) {
  return (err, eventData) => {
    let error = err
    if (!err && eventData.event.data.response.error) {
      error = eventData.event.data.response
    }
    if (!error) {
      let parsedHash = eventData.event.data.response
      return obj.webAuth.validateAuthenticationResponse(options, parsedHash, cb)
    }
    if (error.error === 'consent_required' && window.location.hostname === 'localhost') {
      obj.warn.warning("Consent Required. Consent can't be skipped on localhost.")
    }
    obj.webAuth.transactionManager.clearTransaction(error.state)
    return cb(objectHelper.pick(error, ['error', 'error_description']))
  }
}

function checkSessionManagementCallback(options, obj, cb) {
  return (err, eventData) => {
    let error = err
    if (error) {
      return cb(objectHelper.pick(error, ['error', 'error_description']))
    } else {
      // check data in event should be change, unchange, error
      const data = eventData.event.data
      console.info('RP session management received:', data)
      if (data === 'changed') {
        // session state was changed, auto call check session to refresh
        const encodeState = btoa(
          JSON.stringify({
            usePostMessage: true,
            date: new Date(),
          }),
        )
        obj.webAuth.checkSession({ state: encodeState, nonce: random.randomString(32) }, cb)
      } else if (data === 'error') {
        cb({
          error: 'login_required',
          error_description: 'Login Required!',
        })
      } else {
        // unchanged
        cb(null, data)
      }
    }
  }
}

export default WebMessageHandler
