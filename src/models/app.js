import Auth from '../utilities/auth'
import * as appGlobalService from '../services/app'

const auth = new Auth()
// global model
export default {
  namespace: 'app',
  state: {
    auth,
    userInfo: {},
    permissions: [],
  },
  reducers: {
    saveUserInfo(
      state,
      {
        payload: { data },
      },
    ) {
      return Object.assign(state, { userInfo: data })
    },
    savePermissions(state, { payload }) {},
  },
  effects: {
    *fetchUserInfo(action, { call, put }) {
      const { data } = yield call(appGlobalService.queryUserInfo)
      yield put({ type: 'saveUserInfo', payload: { data } })
    },
    *fetchUserPermissions(action, { call, put }) {},
  },
}

export function fetchUserInfo() {
  return {
    type: 'app/fetchUserInfo',
  }
}
