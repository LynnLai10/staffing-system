import { GET_USERS, CREATE_USER, DELETE_USER, UPDATE_USER } from "../actions/types";

export default function (state = [], action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case CREATE_USER:
      return state.concat(action.payload);
    case DELETE_USER:
      return state.filter((user) => user.employeeId !== action.payload);
    case UPDATE_USER:
      return state.map((user) => {
        if (user.employeeId === action.payload.employeeId) {
          return action.payload
        } else {
          return user
        }
      })
    default:
      return state;
  }
}
