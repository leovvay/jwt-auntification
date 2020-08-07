import { connect } from 'react-redux';
import App from '../pages/App';

import {CHANGE_LOGIN} from '../constants/dispatchType'

const mapStateToProps = state => {
  return state
};

const mapDispatchToProps = dispatch => {
  return {
    changeLogin: (login) => dispatch({ type: CHANGE_LOGIN, payload: login }),
  }
};
const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export default Container;