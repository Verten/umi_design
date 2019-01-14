import objectHelper from './object'

function redirect(url) {
  window.location = url
}

function getDocument() {
  return window.document
}

export function getWindow() {
  return window
}

function getOrigin() {
  var location = window.location
  var origin = location.origin

  if (!origin) {
    origin = objectHelper.getOriginFromUrl(location.href)
  }

  return origin
}

export default {
  redirect: redirect,
  getWindow: getWindow,
  getDocument: getDocument,
  getOrigin: getOrigin,
}
