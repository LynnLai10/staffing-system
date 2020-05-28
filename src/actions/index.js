import client from "../utils/getClient";
import history from "../history";
import { gql } from "apollo-boost";
import {
  GET_USER,
  GET_AUTH,
  LOGOUT,
  CREATE_USER,
  GET_USERS,
  UPDATE_USER,
  DELETE_USER,
} from "./types";

export const getToken = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
  if (token) {
    dispatch({ type: GET_AUTH, payload: token });
    history.push("/dashboard");
  }
};

export const login = ({ employeeId, password }) => async (dispatch) => {
  const auth = gql`
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
  const res = await client(null).mutate({ mutation: auth });
  const token = res.data.login.token;
  localStorage.setItem("EG-token", JSON.stringify(token));
  dispatch({ type: GET_AUTH, payload: token });
  history.push("/dashboard");
};

export const logout = (dispatch) => {
  localStorage.removeItem("EG-token");
  dispatch({ type: LOGOUT });
  history.push("/");
};

export const getUser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
  const getBio = gql`
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
  const res = await client(token).query({ query: getBio });
  console.log(res.data);
  dispatch({ type: GET_USER, payload: res.data.me });
};

export const createUser = (formValue) => async (dispatch) => {
  const { employeeId, name, sex, password, accountType } = formValue;
  const newUser = gql`
    mutation {
      createUser (
        auth: "Eg80949597"
        data: {
          employeeId: "${employeeId}"
          name: "${name}"
          sex: "${sex}"
          password: "${password}"
          accountType: "${accountType}"
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
  const res = await client(null).mutate({ mutation: newUser });
  const data = JSON.stringify(res.data.createUser.user);
  dispatch({ type: CREATE_USER, payload: JSON.parse(data) });
};

export const getUsers = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
  const users = gql`
    query {
      users(orderBy: employeeId_ASC) {
        employeeId
        name
        sex
        accountType
      }
    }
  `;
  const res = await client(token).query({ query: users });
  dispatch({ type: GET_USERS, payload: res.data.users });
};

export const updateUser = (oldEmployeeId, formValue) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
  const { employeeId, name, sex, accountType } = formValue;
  const user = gql`
    mutation {
      updateUser (
        employeeId: "${oldEmployeeId}"
        data: {
          employeeId: "${employeeId}"
          name: "${name}"
          sex: "${sex}"
          accountType: "${accountType}"
        }
      ) {
          employeeId
          name
          sex
          accountType
      }
    }
  `;
  const res = await client(token).mutate({ mutation: user });
  const data = JSON.stringify(res.data.updateUser);
  dispatch({ type: UPDATE_USER, payload: JSON.parse(data) });

};

export const deleteUser = (employeeId) => async (dispatch) => {
  const user = gql`
    mutation {
      deleteUser (
        employeeId: "${employeeId}"
      ) {
        employeeId
      }
    } 
  `;
  await client(null).mutate({ mutation: user });
  dispatch({ type: DELETE_USER, payload: employeeId });
};

export const resetPassword = (employeeId) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
  const user = gql`
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
  await client(token).mutate({ mutation: user });
};
