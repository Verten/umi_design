import fetch from 'dva/fetch'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function addAuthorizationHeader(options) {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    if (!options.header) {
      options.headers = {}
    }
    Object.assign(options.headers, { Authorization: `Bearer ${accessToken}` })
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options = {}) {
  addAuthorizationHeader(options)

  const response = await fetch(url, options)

  checkStatus(response)

  const data = await response.json()

  const ret = {
    data,
    headers: {},
  }

  return ret
}
