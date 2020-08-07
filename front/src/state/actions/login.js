import { createAction } from 'redux-actions';

import { LOGIN_PATH } from 'constants/urls';

import { FETCH_LOGIN } from '../actionTypes';

const loginAction = createAction(FETCH_LOGIN, (values) => {
  return { url: LOGIN_PATH, options: { method: 'POST', body: JSON.stringify(values) } };
});

export default loginAction;
