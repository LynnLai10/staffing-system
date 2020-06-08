import client from "../utils/getClient";
import { gql } from "apollo-boost";
import { FETCH_DEFAULT_SCHEDULE, FETCH_STAFFLIST} from "./types";
const getSchema = (item, i, schedule_No, position) => {
  const schema = gql`
    mutation {
      createSchedule_Staff(
        data: {
          day_No: "${schedule_No}-${i}"
          schedule_No: "${schedule_No}"
          position: "${position}"
          interval_No: "${item.start}_${item.end}"
          employeeId: "${item.employeeId}"
        }
      ){
        id
      }
    }
  `;
  client(null).mutate({ mutation: schema });
};

export const fetchStaffList = () => async dispatch => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    query {
      users {
        name
        employeeId
        sex
      }
    }
  `
  const res = await client(token).query({ query: schema })
  dispatch({ type: FETCH_STAFFLIST, payload: res.data.users})
}

export const createDefaultSchedule = (schedule_No) => async (dispatch) => {
  // const token = JSON.parse(sessionStorage.getItem("EG-token"));
  //create schedule 0
  const schema_createSchedule = gql`
    mutation {
      createSchedule(
        schedule_No: "${schedule_No}"
        ) {
        id
      }
    }
  `;
  await client(null).mutate({ mutation: schema_createSchedule });
  //create schedule day
  const schema_createSchedule_Day = gql`
    mutation {
      createSchedule_Day(
        schedule_No: "${schedule_No}"
        ) {
        id
      }
    }
  `;
  await client(null).mutate({ mutation: schema_createSchedule_Day });
  //create Monday schedule
  const interval_tallyClerk_Mon = [
    { start: 9, end: 19, employeeId: "0048" },
    { start: 9, end: 17, employeeId: "1108" },
    { start: 9, end: 19, employeeId: "" },
    { start: 12, end: 19, employeeId: "" },
  ];
  const interval_tallyClerk_Tue = [
    { start: 9, end: 19, employeeId: "0048" },
    { start: 9, end: 19, employeeId: "1108" },
    { start: 9, end: 19, employeeId: "" },
  ];
  const interval_tallyClerk_Wed = [
    { start: 9, end: 19, employeeId: "0048" },
    { start: 9, end: 19, employeeId: "1108" },
    { start: 9, end: 19, employeeId: "" },
    { start: 12, end: 19, employeeId: "" },
  ];
  const interval_tallyClerk_Thu = [
    { start: 9, end: 21, employeeId: "0048" },
    { start: 9, end: 19, employeeId: "1108" },
    { start: 9, end: 21, employeeId: "" },
    { start: 12, end: 21, employeeId: "" },
  ];
  const interval_tallyClerk_Fri = [
    { start: 9, end: 19, employeeId: "1108" },
    { start: 9, end: 19, employeeId: "" },
    { start: 9, end: 17, employeeId: "" },
    { start: 12, end: 19, employeeId: "" },
  ];
  const interval_casher_Mon = [
    { start: 9, end: 18, employeeId: "" },
    { start: 10, end: 19, employeeId: "" },
  ];
  const interval_casher_Thu = [
    { start: 9, end: 20, employeeId: "" },
    { start: 10, end: 21, employeeId: "" },
  ];
  const interval_casher_Fri = [
    { start: 9, end: 19, employeeId: "" },
    { start: 10, end: 19, employeeId: "" },
  ];
  const interval_casher_Weekend = [
    { start: 9, end: 19, employeeId: "" },
    { start: 10, end: 19, employeeId: "" },
    { start: 10, end: 17, employeeId: "" },
  ];
  for (let i = 0; i < 14; i++) {
    if (i === 0 || i === 7) {
      for (let j = 0; j < interval_tallyClerk_Mon.length; j++) {
        const position = "Tally Clerk";
        const item = interval_tallyClerk_Mon[j];
        getSchema(item, i, schedule_No, position);
      }
      for (let j = 0; j < interval_casher_Mon.length; j++) {
        const position = "Casher";
        const item = interval_casher_Mon[j];
        getSchema(item, i, schedule_No, position);
      }
    }
    if (i === 1 || i === 8) {
      for (let j = 0; j < interval_tallyClerk_Tue.length; j++) {
        const position = "Tally Clerk";
        const item = interval_tallyClerk_Tue[j];
        getSchema(item, i, schedule_No, position);
      }
      for (let j = 0; j < interval_casher_Mon.length; j++) {
        const position = "Casher";
        const item = interval_casher_Mon[j];
        getSchema(item, i, schedule_No, position);
      }
    }
    if (i === 2 || i === 9) {
      for (let j = 0; j < interval_tallyClerk_Wed.length; j++) {
        const position = "Tally Clerk";
        const item = interval_tallyClerk_Wed[j];
        getSchema(item, i, schedule_No, position);
      }
      for (let j = 0; j < interval_casher_Mon.length; j++) {
        const position = "Casher";
        const item = interval_casher_Mon[j];
        getSchema(item, i, schedule_No, position);
      }
    }
    if (i === 3 || i === 10) {
      for (let j = 0; j < interval_tallyClerk_Thu.length; j++) {
        const position = "Tally Clerk";
        const item = interval_tallyClerk_Thu[j];
        getSchema(item, i, schedule_No, position);
      }
      for (let j = 0; j < interval_casher_Thu.length; j++) {
        const position = "Casher";
        const item = interval_casher_Thu[j];
        getSchema(item, i, schedule_No, position);
      }
    }
    if (i === 4 || i === 11) {
      for (let j = 0; j < interval_tallyClerk_Fri.length; j++) {
        const position = "Tally Clerk";
        const item = interval_tallyClerk_Fri[j];
        getSchema(item, i, schedule_No, position);
      }
      for (let j = 0; j < interval_casher_Fri.length; j++) {
        const position = "Casher";
        const item = interval_casher_Fri[j];
        getSchema(item, i, schedule_No, position);
      }
    }
    if (i === 5 || i === 12 || i === 6 || i === 13) {
      for (let j = 0; j < interval_tallyClerk_Fri.length; j++) {
        const position = "Tally Clerk";
        const item = interval_tallyClerk_Fri[j];
        getSchema(item, i, schedule_No, position);
      }
      for (let j = 0; j < interval_casher_Weekend.length; j++) {
        const position = "Casher";
        const item = interval_casher_Weekend[j];
        getSchema(item, i, schedule_No, position);
      }
    }
  }
};

export const fecthDefaultSchedule = () => async (dispatch) => {
  const schema = gql`
    query {
      schedule(schedule_No: "13") {
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
            }
          }
        }
      }
    }
  `;
  const res = await client(null).query({ query: schema });
  dispatch({ type: FETCH_DEFAULT_SCHEDULE, payload: res.data.schedule });
  return res.data.schedule
};

export const fetchSchedule_Day = (day_No) => async (dispatch) => {
  const schema = gql`
    query {
      schedule_day (
          day_No: "${day_No}"
      ) {
        schedule_staffs {
          position
          staff {
            employeeId
          }
          schedule_interval {
            start
            end
          }
        }
      }
    }
  `;
  const res = await client(null).query({ query: schema });
  console.log(res.data.schedule_day);
};
