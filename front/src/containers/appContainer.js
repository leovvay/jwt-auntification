import { createSelector } from 'reselect';

import { connect } from 'react-redux';

import App from 'pages/App';

import * as authActions from 'state/actions/authenticationActions';


const authentication = (state) => state.authentication;

const loginSelector = createSelector([authentication], (value) => value.login);
const isFetchingSelector = createSelector([authentication], (value) => value.isFetching);
const inputErrorMessageSelector = createSelector([authentication], (value) => value.inputErrorMessage);

const mapStateToProps = (state) => {
  return {
    login: loginSelector(state),
    isFetching: isFetchingSelector(state),
    inputErrorMessage: inputErrorMessageSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupFetch: (values) => dispatch(authActions.actionSignup(values)),
    loginFetch: (values) => dispatch(authActions.loginAction(values)),
    changeInputMessage: (message) => dispatch(authActions.changeInputError(message)),
  };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export default Container;
