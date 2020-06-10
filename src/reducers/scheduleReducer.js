import {
  FETCH_DEFAULT_SCHEDULE,
  UPDATE_STAFFS,
  FETCH_STAFFLIST,
} from "../actions/types";
const initialState = {
  schedule_next: {},
  schedule_default: {},
  staffList: {
    tallyClerk: [],
    casher: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DEFAULT_SCHEDULE:
      return action.payload.isDefault
        ? {
            ...state,
            schedule_default: action.payload.schedule,
          }
        : {
            ...state,
            schedule_next: action.payload.schedule,
          };
    case FETCH_STAFFLIST:
      const staffList = action.payload.map((item) => ({
        label: item.name,
        value: item.employeeId,
        sex: item.sex,
      }));
      return {
        ...state,
        staffList: {
          tallyClerk: staffList.filter((item) => item.sex === "Male"),
          casher: staffList.filter((item) => item.sex === "Female"),
        },
      };
    case UPDATE_STAFFS:
      const isDefault = action.payload.day_No.split("-")[0] === "0";
      const data = isDefault ? state.schedule_default : state.schedule_next;
      const schedule_days_updateStaff = data.schedule_days.map((item) => {
        if (item.day_No === action.payload.day_No) {
          return {
            ...item,
            schedule_staffs: action.payload.staffs.concat(),
          };
        }
        return item;
      });
      return isDefault
        ? {
            ...state,
            schedule_default: {
              ...state.schedule_default,
              schedule_days: schedule_days_updateStaff,
            },
          }
        : {
            ...state,
            schedule_next: {
              ...state.schedule_next,
              schedule_days: schedule_days_updateStaff,
            },
          };
    default:
      return state;
  }
}
