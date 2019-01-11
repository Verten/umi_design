import request from '../utilities/request'

export function queryUserInfo() {
  return request('/api/v1/userinfo')
}
