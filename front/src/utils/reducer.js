const initialState = {
    login: 'anonymous',
}

export const reducer = function (state = initialState, action) {
    switch (action.type) {
      case "CHANGE_LOGIN":
        return {...state, login: action.payload};
      default:
        return state;
    }
  };