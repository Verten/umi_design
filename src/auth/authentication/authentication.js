import qs from 'qs'
import urljoin from 'url-join'

import assert from '../helper/assert'
import objectHelper from '../helper/object'

function Authentication(auth, options) {
  if (arguments.length === 2) {
    this.auth = auth
  } else {
    options = auth
  }
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
  this.baseOptions.rootUrl = 'https://' + this.baseOptions.domain
}

Authentication.prototype.buildAuthorizeUrl = function(options) {
  let params
  let qString
  assert.check(options, { type: 'object', message: 'options parameter is not valid' })
  params = objectHelper.merge(this.baseOptions, ['clientID', 'responseType', 'redirectUri', 'scope']).with(options)
  assert.check(
    params,
    { type: 'object', message: 'options parameter is not valid' },
    {
      clientID: { type: 'string', message: 'clientID option is required' },
      redirectUri: { optional: true, type: 'string', message: 'redirectUri option is required' },
      responseType: { type: 'string', message: 'responseType option is required' },
      scope: { optional: true, type: 'string', message: 'scope option is required' },
    },
  )
  params = objectHelper.blacklist(params, ['username', 'popupOptions', 'domain', 'tenant', 'timeout'])
  params = objectHelper.toSnakeCase(params)
  qString = qs.stringify(params)

  return urljoin(this.baseOptions.rootUrl, 'authorize', '?' + qString)
}

Authentication.prototype.buildLogoutUrl = function(options) {
  let params
  let qString

  assert.check(
    options,
    {
      type: 'object',
      message: 'options parameter is not valid',
    },
    {
      postLogoutRedirectUri: { type: 'string', message: 'post logout redirect uri option is required' },
      clientID: { optional: true, type: 'string', message: 'clientID option is not valid' },
      idTokenHint: { type: 'string', message: 'idTokenHint is required' },
    },
  )

  params = objectHelper.merge(this.baseOptions, ['clientID']).with(options || {})

  params = objectHelper.toSnakeCase(params, [])

  qString = qs.stringify(params)

  return urljoin(this.baseOptions.rootUrl, 'logout', '?' + qString)
}

Authentication.prototype.buildSessionManagementUrl = function(options) {
  return urljoin(this.baseOptions.rootUrl, 'session_management')
}

export default Authentication
