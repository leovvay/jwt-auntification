import { createSelector } from 'reselect'

import { connect } from 'react-redux';

import App from 'pages/App';

import actionSignup from 'state/actions/signup';
import actionLogin from 'state/actions/login';
import actionsChangeInputMessage from 'state/actions/changeInputError'

const getLogin = state => state.login;
const getIsFetching = state => state.isFetching;
const getInputErrorMessage = state => state.inputErrorMessage;

const loginSelector = createSelector([getLogin], (value) => value);
const isFetchingSelector = createSelector([getIsFetching], (value) => value);
const inputErrorMessageSelector = createSelector([getInputErrorMessage], (value) => value);

const mapStateToProps = (state) => {
  return {
    login: loginSelector(state),
    isFetching: isFetchingSelector(state),
    inputErrorMessage: inputErrorMessageSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupFetch: (values) => dispatch(actionSignup(values)),
    loginFetch: (values) => dispatch(actionLogin(values)),
    changeInputMessage: (message) => dispatch(actionsChangeInputMessage(message)),
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export default Container;
