import client from "../utils/getClient";
import { gql } from "apollo-boost";
import {
  FETCH_FREETIME,
  UPDATE_FREETIME,
  CHANGE_FREETIME,
  CHANGE_USEDEFAULT,
} from "./types";


const parseData = (isDefault, data) => {
  if (isDefault === undefined || isDefault ) {
    data.freetime_default = JSON.parse(data.freetime_default);
  } 
  if (isDefault === undefined || !isDefault) {
    data.freetime_next = JSON.parse(data.freetime_next);
  }
  return data;
};

//-----------------------------------------------------------------------//;
export const fetchFreetime = () => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    query {
      myFreetimes {
        freetime_next
        freetime_default
        useDefault
      }
    }
  `;
  const res = await client(token).query({ query: schema });
  const parsedFreetime = parseData(undefined, res.data.myFreetimes[0])
  dispatch({
    type: FETCH_FREETIME,
    payload: {
      ...parsedFreetime,
      useDefault: res.data.myFreetimes[0].useDefault,
    },
  });
};

export const updateFreetime = (isDefault, freetime) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const key = isDefault ? "freetime_default" : "freetime_next";
  const stringifyFreetime = JSON.stringify(freetime)
  const schema = gql`
    mutation {
      updateFreetime (
        data: {
          ${key}: "${stringifyFreetime}"
        }
      ){
        ${key}
      }
    }
  `;
  const res = await client(token).mutate({ mutation: schema });
  dispatch({
    type: UPDATE_FREETIME,
    payload: parseData(isDefault, res.data.updateFreetime),
  });
};

export const changeFreetime = (isDefault, index, freetime) => async (
  dispatch
) => {
  dispatch({
    type: CHANGE_FREETIME,
    payload: {
      isDefault,
      index,
      freetime
    }
  });
};

export const resetFreetime = (isDefault) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const key = isDefault ? "freetime_default" : "freetime_next";
  const schema = gql`
    mutation {
      resetFreetime(
        resetItem: "${key}"
      ) {
        ${key}
      }
    }
  `;
  const res = await client(token).mutate({ mutation: schema });
  dispatch({
    type: UPDATE_FREETIME,
    payload: parseData(isDefault, res.data.resetFreetime),
  });
};

export const changeUseDefault = (useDefault) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    mutation {
      updateFreetime (
        data: {
          useDefault: ${!useDefault}
        }
      ){
        useDefault
      }
    }
  `;
  await client(token).mutate({ mutation: schema });
  dispatch({ type: CHANGE_USEDEFAULT })
};
 