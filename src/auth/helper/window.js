import objectHelper from './object'

function redirect(url) {
  getWindow().location = url
}

function getDocument() {
  return getWindow().document
}

export function getWindow() {
  return window
}

function getOrigin() {
  var location = getWindow().location
  var origin = location.origin

  if (!origin) {
    origin = objectHelper.getOriginFromUrl(location.href)
  }

  return origin
}

export default {
  redirect: redirect,
  getDocument: getDocument,
  getOrigin: getOrigin,
}
