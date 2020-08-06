import {
  CHANGE_LOGIN,
  CHANGE_INPUT_ERROR_MESSAGE,
  START_FETCH,
  END_FETCH,
} from '../constants/dispatchType';

const initialState = {
  login: 'anonymous',
  inputErrorMessage: {
    status: '',
    text: '',
  },
  isFetching: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.payload };
    case CHANGE_INPUT_ERROR_MESSAGE:
      return { ...state, inputErrorMessage: action.payload };
    case START_FETCH:
      return { ...state, isFetching: true };
    case END_FETCH:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};
