import { createAction } from 'redux-actions';

import { SIGHUP_PATH } from 'constants/urls';

import { FETCH_SIGNUP } from '../actionTypes';

const actionSignup = createAction(FETCH_SIGNUP, (values) => {
  return {
    url: SIGHUP_PATH,
    options: { method: 'POST', body: JSON.stringify(values) },
    formValues: values,
  };
});

export default actionSignup;
