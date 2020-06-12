import client from "../utils/getClient";
import { gql } from "apollo-boost";
import {
  FETCH_FREETIME,
  UPDATE_FREETIME,
  CHANGE_USEDEFAULT,
} from "./types";

//-----------------------------------------------------------------------//;
export const fetchFreetime = (schedule_No) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    query {
      myFreetimes (
        schedule_No: "${schedule_No}"
      ){
        schedule {
          schedule_No
        }
        day_No
        availability
      }
    }
  `;
  const res = await client(token).query({ query: schema });
  if (res.data.myFreetimes) {
    dispatch({
      type: FETCH_FREETIME,
      payload: {
        isDefault: schedule_No === "0" ? true : false,
        freetime: res.data.myFreetimes
      },
    });
  }
};

export const createFreetime = (schedule_No) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema_deleteDefaultFreetime = gql`
    mutation {
      deleteManyFreetimes(
        schedule_No: "${schedule_No}"
      )
    }
  `
  await client(token).mutate({ mutation: schema_deleteDefaultFreetime })
  
  for (let i = 0; i < 14; i++) {
    const schema = gql`
      mutation {
        createFreetime(
          data: {
            schedule_No: "${schedule_No}"
            day_No: "${schedule_No}_${i}"
          }
        ){
          id
        }
      }
    `;
    console.log(schema)
    await client(token).mutate({ mutation: schema });
  }
};

export const updateFreetime = (freetime) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    mutation {
      updateFreetime (
        day_No: "${freetime.day_No}"
        data: {
          availability: "${freetime.availability}"
        }
      ){
        id
      }
    }
  `;
  await client(token).mutate({ mutation: schema });
  dispatch({
    type: UPDATE_FREETIME,
    payload: freetime,
  });
};

export const changeUseDefault = (employeeId, useDefaultFreetime) => async (
  dispatch
) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    mutation {
      updateUser (
        employeeId: "${employeeId}"
        data: {
          useDefaultFreetime: ${useDefaultFreetime}
        }
      ){
        id
      }
    }
  `;
  await client(token).mutate({ mutation: schema });
  dispatch({ type: CHANGE_USEDEFAULT, payload: useDefaultFreetime });
};
