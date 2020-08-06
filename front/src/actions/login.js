import store from '../utils/configure-store'

import { FETCH_LOGIN } from '../constants/dispatchType'

const loginAction = (values) => store.dispatch({type: FETCH_LOGIN, payload: ['/user/login', { method: 'POST', body: JSON.stringify(values) }]})

export default loginAction