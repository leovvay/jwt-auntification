import { createAction } from 'redux-actions';

import { LOGIN_PATH, SIGHUP_PATH } from 'constants/urls';

import {
  CHANGE_INPUT_ERROR_MESSAGE,
  FETCH_LOGIN,
  FETCH_SIGNUP,
  START_FETCH,
  END_FETCH,
  USER_FETCH_FAILED,
  CHANGE_LOGIN,
} from '../actionTypes';

export const changeInputError = createAction(CHANGE_INPUT_ERROR_MESSAGE);

export const changeLogin = createAction(CHANGE_LOGIN);

export const loginAction = createAction(FETCH_LOGIN, (values) => {
  return { url: LOGIN_PATH, options: { method: 'POST', body: JSON.stringify(values) } };
});

export const actionSignup = createAction(FETCH_SIGNUP, (values) => {
  return {
    url: SIGHUP_PATH,
    options: { method: 'POST', body: JSON.stringify(values) },
    formValues: values,
  };
});

export const startFetch = createAction(START_FETCH);

export const endFetch = createAction(END_FETCH);

export const userFetchFailed = createAction(USER_FETCH_FAILED);
