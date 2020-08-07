import { FETCH_LOGIN } from '../constants/dispatchType';
import { LOGIN_PATH } from '../constants/urls';

const loginAction = (values) => {
  return {
    type: FETCH_LOGIN,
    payload: {
      url: LOGIN_PATH,
      options: { method: 'POST', body: JSON.stringify(values) },
    },
  };
};

export default loginAction;
