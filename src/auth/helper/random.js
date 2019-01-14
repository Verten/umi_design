function randomString(length) {
  // eslint-disable-next-line
  var bytes = new Uint8Array(length)
  let result = []
  let charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~'

  let cryptoObj = window.crypto || window.msCrypto
  if (!cryptoObj) {
    return null
  }

  let random = cryptoObj.getRandomValues(bytes)

  for (let a = 0; a < random.length; a++) {
    result.push(charset[random[a] % charset.length])
  }

  return result.join('')
}

export default {
  randomString: randomString,
}
