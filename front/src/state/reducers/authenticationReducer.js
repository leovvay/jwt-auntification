import {
  CHANGE_LOGIN,
  CHANGE_INPUT_ERROR_MESSAGE,
  START_FETCH,
  END_FETCH,
  USER_FETCH_FAILED,
} from '../actionTypes';

const initialState = {
  login: 'anonymous',
  inputErrorMessage: {},
  isFetching: false,
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.payload };
    case CHANGE_INPUT_ERROR_MESSAGE:
      return { ...state, inputErrorMessage: action.payload };
    case START_FETCH:
      return { ...state, isFetching: true };
    case END_FETCH:
    case USER_FETCH_FAILED:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}