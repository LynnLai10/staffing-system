import { FETCH_AUTH, LOGOUT } from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_AUTH:
      return {
        ...state,
        authenticated: true
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false
      };
    default:
      return state;
  }
}
