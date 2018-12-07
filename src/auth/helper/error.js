function buildResponse(error, description) {
  return {
    error: error,
    error_description: description,
  }
}

function invalidToken(description) {
  return buildResponse('invalid_token', description)
}

export default {
  buildResponse: buildResponse,
  invalidToken: invalidToken,
}
