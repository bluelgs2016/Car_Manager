import { AUTH_ACTION } from "hooks/actions/mainAction";

const mainState = {
  authState: false,
  userInfo: null,
}

const mainReducer = (state = mainState, action) => {
  switch (action.type) {
    case AUTH_ACTION:
      return Object.assign({}, state, {
        authState: action.payload.authState,
        userInfo: action.payload.userInfo
      });
    default:
      return state;
  }
};

export default mainReducer;
