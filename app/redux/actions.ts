import * as ACTIONS from "./actionTypes";

export const login = (username: string, password: string) => ({
  type: ACTIONS.LOGIN,
  payload: {
    username, password
  }
});
export const logout = (username: string) => ({
  type: ACTIONS.LOGOUT,
  payload: {
    username
  }
});

export const setLoading = (isLoading: boolean) => ({
  type: ACTIONS.SET_LOADING,
  payload: {
    isLoading
  }
});

export const setTitle = (title: string) => ({
  type: ACTIONS.SET_TITLE,
  payload: {
    title
  }
});
