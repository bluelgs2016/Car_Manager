export const AUTH_ACTION = "AUTH_ACTION";

export const authAction = (isAuth, userInfo) => {
  return {
    type: AUTH_ACTION,
    payload: {
      authState: isAuth,
      userInfo: userInfo,
    },
  };
};
