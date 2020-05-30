import { FETCH_AUTH, LOGOUT } from "../actions/types";

export default function (state = false, action) {
  switch (action.type) {
    case FETCH_AUTH:
      return action.payload;
    case LOGOUT:
      return false;
    default:
      return state;
  }
}
