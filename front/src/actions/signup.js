import store from '../utils/configure-store';

import { FETCH_SIGNUP } from '../constants/dispatchType';

const actionSignup = (values) =>
  store.dispatch({
    type: FETCH_SIGNUP,
    payload: ['/user/signup', { method: 'POST', body: JSON.stringify(values) }],
    formValues: values,
  });


  export default actionSignup;