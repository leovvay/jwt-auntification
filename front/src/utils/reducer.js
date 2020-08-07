import { CHANGE_LOGIN, CHANGE_INPUT_ERROR_MESSAGE} from '../constants/dispatchType';

const initialState = {
  login: 'anonymous',
  inputErrorMessage: {
    status: '',
    text: '',
  }
};


export const reducer =  function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOGIN:
      return { ...state, login: action.payload };
      case CHANGE_INPUT_ERROR_MESSAGE:
        console.log(action);
        return { ...state, inputErrorMessage: action.payload };
    default:
      return state;
  }
};
