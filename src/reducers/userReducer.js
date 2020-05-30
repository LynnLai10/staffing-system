import { FETCH_USER, RESET_AVAILABILITY } from "../actions/types";


export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case RESET_AVAILABILITY:
      const { availability_next, availability_default } = action.payload
      console.log(action.payload)
      return {
        ...state,
        availability_next,
        availability_default
      }
    default:
      return state;
  }
}
