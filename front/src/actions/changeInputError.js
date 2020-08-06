import { CHANGE_INPUT_ERROR_MESSAGE } from '../constants/dispatchType';

const changeInputError = (message) => {
  return { type: CHANGE_INPUT_ERROR_MESSAGE, payload: message };
};

export default changeInputError;
