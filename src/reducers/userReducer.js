import { FETCH_USER } from "../actions/types";
import getDate from "../utils/getDate";

const dates = getDate();
const initialState = {
  user: {
    name: undefined,
    sex: undefined,
    employeeId: undefined,
    accountType: undefined,
    useDefaultFreetime: false,
  },
  dates: {
    ...dates,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
