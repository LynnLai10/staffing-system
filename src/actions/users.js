import client from "../utils/getClient";
import history from "../history";
import { gql } from "apollo-boost";
import {
  FETCH_USER,
  FETCH_AUTH,
  LOGOUT,
  CREATE_USER,
  FETCH_USERS,
  UPDATE_USER,
  DELETE_USER
} from "./types";

export const fetchToken = () => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  if (token) {
    dispatch({ type: FETCH_AUTH });
    history.push("/dashboard");
  } else {
    dispatch({ type: LOGOUT });
    history.push("/");
  }
};

export const login = ({ employeeId, password }) => async (dispatch) => {
  const schema = gql`
    mutation {
      login (
        data: {
          employeeId: "${employeeId}"
          password: "${password}"
        }
      ) {
        user {
          id
        }
        token
      }
    }
  `;
  const res = await client(null).mutate({ mutation: schema });
  sessionStorage.setItem("EG-token", JSON.stringify(res.data.login.token));
  dispatch({ type: FETCH_AUTH });
  history.push("/dashboard");
};

export const logout = () => async (dispatch) => {
  sessionStorage.clear();
  dispatch({ type: LOGOUT });
  console.log('logout')
  history.push("/");
};

export const fetchUser = () => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    query {
      me {
        id
        name
        employeeId
        accountType
        sex
      }
    }
  `;
  const res = await client(token).query({ query: schema });
  dispatch({ type: FETCH_USER, payload: res.data.me });
};

export const createUser = (formValue) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const { employeeId, name, sex, accountType } = formValue;
  const schema = gql`
    mutation {
      createUser (
        auth: "Eg80949597"
        data: {
          employeeId: "${employeeId}"
          name: "${name}"
          sex: "${sex}"
          accountType: "${accountType}"
          password: "${employeeId}"
        }
      ) {
        user {
          employeeId
          name
          sex
          accountType
        }
      }
    }
  `;
  const freetimeSchema = gql`
    mutation {
      createFreetime (
        employeeId: "${employeeId}"
      ) {
        id
      }
    }
  `
  await client(token).mutate({ mutation: schema });
  await client(null).mutate({ mutation: freetimeSchema })
  dispatch({ type: CREATE_USER, payload: formValue });
};

export const fetchUsers = () => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    query {
      users(orderBy: employeeId_ASC) {
        employeeId
        name
        sex
        accountType
      }
    }
  `;
  const res = await client(token).query({ query: schema });
  dispatch({ type: FETCH_USERS, payload: res.data.users });
};

export const updateUser = (oldEmployeeId, formValue) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  let data = "";
  if (formValue.hasOwnProperty("password")) {
    data = `password: "${formValue.password}"`;
  } else {
    const { employeeId, name, sex, accountType } = formValue;
    data = `
      employeeId: "${employeeId}"
      name: "${name}"
      sex: "${sex}"
      accountType: "${accountType}"
    `;
  }
  const combinedSchema =`
    mutation {
      updateUser (
        employeeId: "${oldEmployeeId}"
        data: {
          `+ data +`
        }
      ) {
          employeeId
          name
          sex
          accountType
      }
    }
  `;
  const schema = gql`${combinedSchema}`
  await client(token).mutate({ mutation: schema });
  if (!formValue.hasOwnProperty("password")) {
    dispatch({ type: UPDATE_USER, payload: formValue });
  }
  
};

export const deleteUser = (employeeId) => async (dispatch) => {
  const schema = gql`
    mutation {
      deleteUser (
        employeeId: "${employeeId}"
      ) {
        employeeId
      }
    } 
  `;
  await client(null).mutate({ mutation: schema });
  dispatch({ type: DELETE_USER, payload: employeeId });
};

export const resetPassword = (employeeId) => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  const schema = gql`
    mutation {
      updateUser (
        employeeId: "${employeeId}"
        data: {
          password: "${employeeId}"
        }
      ){
      employeeId
    } 
  }
  `;
  await client(token).mutate({ mutation: schema });
};
