import store from '../utils/configure-store'

import { CHANGE_INPUT_ERROR_MESSAGE } from '../constants/dispatchType'


const changeInputError = message => store.dispatch({type: CHANGE_INPUT_ERROR_MESSAGE, payload: message});

export default changeInputError;