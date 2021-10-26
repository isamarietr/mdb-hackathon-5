import { initialState } from "../initial-state";
import * as ACTIONS from "../actionTypes";

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOGIN: {
      const { username, password } = action.payload;
      return {
        ...state,
        username, password
      };
    }
    case ACTIONS.LOGOUT: {
      const { username } = action.payload;
      return {
        ...state,
        username
      };
    }
    case ACTIONS.SET_LOADING: {
      const { isLoading } = action.payload;
      return {
        ...state,
        isLoading
      };
    }
    case ACTIONS.SET_TITLE: {
      const { title } = action.payload;
      return {
        ...state,
        title
      };
    }
    default:
      return state;
  }
}
