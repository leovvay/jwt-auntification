import { call, put, takeLatest } from 'redux-saga/effects';
import { Modal } from 'antd';

import MyFetch from 'utils/myFetch';
import { OK, UNAUTHORIZED, FORBIDDEN } from 'constants/statusCode';
import { COLOR_RED, WRONG_LOGIN_OR_PASSWORD, CHECK_EMAIL } from 'constants/infoText';
import * as authActions from 'state/actions/authenticationActions';

import { FETCH_LOGIN, FETCH_SIGNUP } from '../actionTypes';

function* fetchLogin(action) {
  const { url, options } = action.payload;
  try {
    yield put(authActions.startFetch());
    const request = yield call(MyFetch, url, options);
    switch (request.status) {
      case OK: {
        const response = yield request.json();
        if (response) {
          sessionStorage.token = response.token;
          if (response.user) {
            yield put(authActions.changeLogin(response.user.login));
          }
        }
        break;
      }
      case UNAUTHORIZED: {
        const message = { status: COLOR_RED, text: WRONG_LOGIN_OR_PASSWORD };
        yield put(authActions.changeInputError(message));
        break;
      }
      case FORBIDDEN: {
        const message = { status: COLOR_RED, text: CHECK_EMAIL };
        yield put(authActions.changeInputError(message));
        break;
      }
      default:
        break;
    }
    yield put(authActions.endFetch());
  } catch (e) {
    yield put(authActions.userFetchFailed());
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
        yield put(authActions.changeInputError(message));
        break;
      }
      default:
        break;
    }
  } catch (e) {
    yield put(authActions.userFetchFailed());
  }
}

function* mySaga() {
  yield takeLatest(FETCH_LOGIN, fetchLogin);
  yield takeLatest(FETCH_SIGNUP, fetchSignup);
}

export default mySaga;
