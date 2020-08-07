import { FETCH_SIGNUP } from '../constants/dispatchType';
import { SIGHUP_PATH } from '../constants/urls';

const actionSignup = (values) => {
  return {
    type: FETCH_SIGNUP,
    payload: {
      url: SIGHUP_PATH,
      options: { method: 'POST', body: JSON.stringify(values) },
      formValues: values,
    },
  };
};

export default actionSignup;
