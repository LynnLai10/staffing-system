import {
  FETCH_USER,
  FETCH_FREETIME,
  UPDATE_FREETIME,
  CHANGE_FREETIME,
  CHANGE_USEDEFAULT,
} from "../actions/types";
const initialState = {
  user: {
    name: undefined,
    sex: undefined,
    employeeId: undefined,
    accountType: undefined,
  },
  schedule: {
    freetime_next: undefined,
    freetime_default: undefined,
    useDefault: undefined,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_FREETIME:
      return {
        ...state,
        schedule: action.payload,
      };
    case UPDATE_FREETIME:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          ...action.payload,
        },
      };
    case CHANGE_FREETIME:
      const { isDefault, index, freetime } = action.payload;
      const newFreetime = {};
      freetime[index] = !freetime[index];
      if (isDefault) {
        newFreetime.freetime_default = freetime.concat();
      } else {
        newFreetime.freetime_next = freetime.concat();
      }
      return {
        ...state,
        schedule: {
          ...state.schedule,
          ...newFreetime,
        },
      };
    case CHANGE_USEDEFAULT:
      return {
        ...state,
        schedule: {
          ...state.schedule,
          useDefault: !state.schedule.useDefault
        }
      }
    default:
      return state;
  }
}
