import IframeHandler from '../helper/iframe-handler'
import objectHelper from '../helper/object'
import windowHelper from '../helper/window'
import Warn from '../helper/warn'

function runWebMessageFlow(authorizeUrl, options, callback, validatorCallback) {
  const handler = new IframeHandler({
    url: authorizeUrl,
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
  if (redirectUriOrigin && currentOrigin !== redirectUriOrigin) {
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
    runWebMessageFlow(
      this.webAuth.client.buildSessionManagementUrl(options),
      options,
      checkSessionManagementCallback(options, _this, cb),
      checkSessionManagementValidator,
    )
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
    return eventData.event.data === 'error' || eventData.event.data === 'unchange' || eventData.event.data === 'change'
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
    if (error.error === 'consent_required' && windowHelper.getWindow().location.hostname === 'localhost') {
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
      if (data === 'change') {
        obj.webAuth.checkSession({}, cb)
      } else if (data === 'error') {
        cb({
          error: 'login_required',
          error_description: 'Login Required!',
        })
      }
    }
  }
}

export default WebMessageHandler
