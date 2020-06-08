import client from "../utils/getClient";
import { gql } from "apollo-boost";
import { UPDATE_STAFFS } from "./types";


export const updateStaffs = (data, staffs) => async (dispatch) => {
  //deleted staff
  const oldId = data.schedule_staffs.map((item) => item.id);
  const newId = staffs.map((item) => item.id);
  const deletedId = oldId.filter((item) => !newId.includes(item));
  if (deletedId) {
    for (let i = 0; i < deletedId.length; i++) {
      const schema = gql`
        mutation {
          deleteSchedule_Staff(
            id: "${deletedId[i]}"
          ){
          id
         }
        } 
      `;
      client(null).mutate({ mutation: schema });
    }
  } 

    for (let i = 0; i < staffs.length; i++) {
      let {
        id,
        position,
        staff,
        schedule_interval,
      } = staffs[i];
      if (!staff) {
        staff = {
          employeeId: ""
        }
      }
      //create new Staff
      if (!id) {
        const schema = gql`
        mutation {
          createSchedule_Staff(
            data: {
              day_No: "${data.day_No}"
              schedule_No: "${data.day_No.split('-')[0]}"
              position: "${position}"
              interval_No: "${schedule_interval.start}_${schedule_interval.end}"
              employeeId: "${staff.employeeId}"
            }
          ) { 
            id
          }
        } 
      `;
        client(null).mutate({ mutation: schema });
      } else {
        //update exist Staff
        const schema = gql`
        mutation {
          updateSchedule_Staff(
            data: {
              id: "${id}"
              interval_No: "${schedule_interval.start}_${schedule_interval.end}"
              employeeId: "${staff.employeeId}"
            }
          ){
           id
          }
        } 
      `;
        client(null).mutate({ mutation: schema });
      }
    }
  dispatch({
    type: UPDATE_STAFFS,
    payload: {
      day_No: data.day_No,
      staffs,
    },
  });
};

