import { connect } from 'react-redux';
import App from '../pages/App';

import { CHANGE_LOGIN } from '../constants/dispatchType';
import actionSignup from '../actions/signup';
import actionLogin from '../actions/login';
import actionsChangeInputMessage from '../actions/changeInputError'

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogin: (login) => dispatch({ type: CHANGE_LOGIN, payload: login }),
    signupFetch: (values) => dispatch(actionSignup(values)),
    loginFetch: (values) => dispatch(actionLogin(values)),
    changeInputMessage: (message) => dispatch(actionsChangeInputMessage(message)),
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export default Container;
