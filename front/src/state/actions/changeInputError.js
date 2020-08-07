
import { createAction } from 'redux-actions';
import { CHANGE_INPUT_ERROR_MESSAGE } from '../actionTypes';

const changeInputError = createAction(CHANGE_INPUT_ERROR_MESSAGE, message => message);

export default changeInputError;
