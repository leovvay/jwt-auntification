import { call, put, takeLatest } from 'redux-saga/effects';
import { Modal } from 'antd';

import {
  FETCH_LOGIN,
  CHANGE_LOGIN,
  CHANGE_INPUT_ERROR_MESSAGE,
  FETCH_SIGNUP,
  START_FETCH,
  END_FETCH,
} from '../constants/dispatchType';
import { OK, UNAUTHORIZED, FORBIDDEN } from '../constants/statusCode';
import { COLOR_RED, WRONG_LOGIN_OR_PASSWORD, CHECK_EMAIL } from '../constants/infoText';

import MyFetch from './myFetch';

function* fetchLogin(action) {
  const { url, options } = action.payload;
  try {
    yield put({ type: START_FETCH });
    const request = yield call(MyFetch, url, options);
    switch (request.status) {
      case OK: {
        const response = yield request.json();
        if (response) {
          sessionStorage.token = response.token;
          if (response.user) {
            yield put({ type: CHANGE_LOGIN, payload: response.user.login });
          }
        }
        break;
      }
      case UNAUTHORIZED: {
        const message = { status: COLOR_RED, text: WRONG_LOGIN_OR_PASSWORD };
        yield put({ type: CHANGE_INPUT_ERROR_MESSAGE, payload: message });
        break;
      }
      case FORBIDDEN: {
        const message = { status: COLOR_RED, text: CHECK_EMAIL };
        yield put({ type: CHANGE_INPUT_ERROR_MESSAGE, payload: message });
        break;
      }
      default:
        break;
    }
    yield put({ type: END_FETCH });
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* fetchSignup(action) {
  const { url, options, formValues } = action.payload;
  try {
    const request = yield call(MyFetch, url, options);
    switch (request.status) {
      case OK: {
        const response = yield request.json();
        sessionStorage.token = response.token;
        Modal.success({
          content: `an email: ${formValues.email} was sent to confirm the registration`,
        });
        break;
      }
      case UNAUTHORIZED: {
        const message = {
          status: COLOR_RED,
          text: `login: ${formValues.login} is already exists`,
        };
        yield put({ type: CHANGE_INPUT_ERROR_MESSAGE, payload: message });
        break;
      }
      default:
        break;
    }
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(FETCH_LOGIN, fetchLogin);
  yield takeLatest(FETCH_SIGNUP, fetchSignup);
}

export default mySaga;
