import {
  FETCH_USER,
  FETCH_FREETIME,
  UPDATE_FREETIME,
  CHANGE_USEDEFAULT,
} from "../actions/types";
const initialState = {
  user: {
    name: undefined,
    sex: undefined,
    employeeId: undefined,
    accountType: undefined,
    useDefaultFreetime: false,
  },
  freetime_next: [],
  freetime_default: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_FREETIME:
      return action.payload.isDefault
        ? {
            ...state,
            freetime_default: action.payload.freetime,
          }
        : {
            ...state,
            freetime_next: action.payload.freetime,
          };
    case UPDATE_FREETIME:
      const isDefault = action.payload.day_No.split("_")[0] === "0";
      const data = isDefault ? state.freetime_default : state.freetime_next;
      const updatedFreetime = data.map((item) => {
        if (item.day_No === action.payload.day_No) {
          return action.payload;
        }
        return item;
      });
      return isDefault
        ? {
            ...state,
            freetime_default: updatedFreetime,
          }
        : {
            ...state,
            freetime_next: updatedFreetime,
          };
    case CHANGE_USEDEFAULT:
      return {
        ...state,
        user: {
          ...state.user,
          useDefaultFreetime: action.payload,
        },
      };
    default:
      return state;
  }
}
