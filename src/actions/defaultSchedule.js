import client from "../utils/getClient";
import { gql } from "apollo-boost";
import { FETCH_DEFAULT_SCHEDULE, FETCH_STAFFLIST } from "./types";
import createStaff from './utils/createStaff'

// const schema_createSchedule_Staff = (i, schedule_No, employeeId, position, interval_No) => {
//   const schema = gql`
//     mutation {
//       createSchedule_Staff(
//         data: {
//           day_No: "${schedule_No}_${i}"
//           schedule_No: "${schedule_No}"
//           position: "${position}"
//           interval_No: "${interval_No}"
//           employeeId: "${employeeId}"
//         }
//       ){
//         id
//       }
//     }
//   `;
//   client(null).mutate({ mutation: schema });
// };

const schema_createSchedule_Day = (i, schedule_No) => {
  const schema = gql`
      mutation {
        createSchedule_Day(
          schedule_No: "${schedule_No}"
          day_No: "${schedule_No}_${i}"
        ){
          id
        }
      }
  `;
    client(null).mutate({ mutation: schema })
}

export const fecthDefaultSchedule = (schedule_No) => async (dispatch) => {
  console.log("fetch schedule request")
  const schema = gql`
    query {
      schedules (
        schedule_No: "${schedule_No}"
        ) {
        schedule_No
        schedule_days {
          day_No
          schedule_staffs {
            id
            schedule_interval {
              start
              end
            }
            position
            staff {
              employeeId
              name
            }
          }
        }
      }
    }
  `;
  const res = await client(null).query({ query: schema });
  if (res) {
    dispatch({
      type: FETCH_DEFAULT_SCHEDULE,
      payload: {
        isDefault: schedule_No === "0" ? true : false,
        schedule: res.data.schedules[0],
      },
    });
  }
};

// export const fetchStaffList = () => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const schema = gql`
//     query {
//       users {
//         name
//         employeeId
//         sex
//       }
//     }
//   `;
//   const res = await client(token).query({ query: schema });
//   dispatch({ type: FETCH_STAFFLIST, payload: res.data.users });
// };

export const createDefaultSchedule = (schedule_No) => async (dispatch) => {
  //fetch default schedule
  const schema_defaultSchedule = gql`
    query {
      schedules (
        schedule_No: "0"
        ) {
        schedule_No
        schedule_days {
          day_No
          schedule_staffs {
            staff {
              employeeId
            }
            position
            schedule_interval {
              interval_No
            }
          }
        }
      }
    }
  `;
  const defaultData = await client(null).query({
    query: schema_defaultSchedule,
  });
  const schema_createSchedule = gql`
    mutation {
      createSchedule(
        schedule_No: "${schedule_No}"
      ){
        id
      }
    }
  `;
  await client(null).mutate({ mutation: schema_createSchedule });
  //create schedule day
  for (let i = 0; i < 14; i++) {
    await schema_createSchedule_Day(i, schedule_No)
  }

  if (defaultData.data.schedule) {
    const { schedule_days } = defaultData.data.schedule;
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < schedule_days[i].schedule_staffs.length; j++) {
        const { staff, position, schedule_interval } = schedule_days[
          i
        ].schedule_staffs[j];
        const employeeId = staff ? staff.employeeId : "";
        createStaff(
          i,
          schedule_No,
          employeeId,
          position,
          schedule_interval.interval_No
        );
      }
    }
  }
};

// export const fetchSchedule_Day = (day_No) => async (dispatch) => {
//   const schema = gql`
//     query {
//       schedule_day (
//           day_No: "${day_No}"
//       ) {
//         schedule_staffs {
//           position
//           staff {
//             employeeId
//           }
//           schedule_interval {
//             start
//             end
//           }
//         }
//       }
//     }
//   `;
//   const res = await client(null).query({ query: schema });
//   console.log(res.data.schedule_day);
// };
