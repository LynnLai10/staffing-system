import {
  FETCH_DEFAULT_SCHEDULE,
  UPDATE_STAFFS,
  FETCH_STAFFLIST,
} from "../actions/types";
const initialState = {
  schedule: {},
  staffList: {
    tallyClerk: [],
    casher: [],
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DEFAULT_SCHEDULE:
      return {
        ...state,
        schedule: action.payload,
      };
    case FETCH_STAFFLIST:
      const staffList = action.payload.map((item) => ({
        label: item.name,
        value: item.employeeId,
        sex: item.sex
      }));
      return {
        ...state,
        staffList: {
          tallyClerk: staffList.filter(item => item.sex === "Male"),
          casher: staffList.filter(item => item.sex === "Female")
        }
      };
    case UPDATE_STAFFS:
      const schedule_days_updateStaff = state.schedule.schedule_days.map(
        (item) => {
          if (item.day_No === action.payload.day_No) {
            return {
              ...item,
              schedule_staffs: action.payload.staffs.concat(),
            };
          }
          return item;
        }
      );
      console.log(schedule_days_updateStaff);
      return {
        ...state,
        schedule: {
          ...state.schedule,
          schedule_days: schedule_days_updateStaff,
        },
      };
    default:
      return state;
  }
}
