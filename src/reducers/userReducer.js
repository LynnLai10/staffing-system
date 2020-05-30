import {
  FETCH_USER,
  UPDATE_AVAILABILITY,
  CHANGE_AVAILABILITY,
} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case UPDATE_AVAILABILITY:
      const { availability_next, availability_default } = action.payload;
      return {
        ...state,
        availability_next,
        availability_default,
      };
    case CHANGE_AVAILABILITY:
      const { isDefault, availability } = action.payload;
      const newAvailability = availability.concat();
      if (isDefault) {
        return {
          ...state,
          availability_default: newAvailability,
        };
      } else {
        return {
          ...state,
          availability_next: newAvailability,
        };
      }

    default:
      return state;
  }
}
