import Auth from '../utilities/auth'

const auth = new Auth()

export default {
  namespace: 'app',
  state: {
    auth,
  },
}
