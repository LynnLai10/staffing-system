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
  DELETE_USER,
  UPDATE_AVAILABILITY,
  CHANGE_AVAILABILITY
} from "./types";

export const fetchToken = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
  if (token) {
    dispatch({ type: FETCH_AUTH, payload: token });
    history.push("/dashboard");
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
  const token = res.data.login.token;
  localStorage.setItem("EG-token", JSON.stringify(token));
  dispatch({ type: FETCH_AUTH, payload: token });
  history.push("/dashboard");
};

export const logout = (dispatch) => {
  localStorage.removeItem("EG-token");
  dispatch({ type: LOGOUT });
  history.push("/");
};

export const fetchUser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
  const schema = gql`
    query {
      me {
        id
        name
        employeeId
        accountType
        sex
        availability_next
        availability_default
      }
    }
  `;
  const res = await client(token).query({ query: schema });
  const data = res.data.me
  data.availability_next = JSON.parse(data.availability_next)
  data.availability_default = JSON.parse(data.availability_default)
  dispatch({ type: FETCH_USER, payload: data});
};

export const createUser = (formValue) => async (dispatch) => {
  const { employeeId, name, sex, password, accountType } = formValue;
  const schema = gql`
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
  const res = await client(null).mutate({ mutation: schema });
  const data = JSON.stringify(res.data.createUser.user);
  dispatch({ type: CREATE_USER, payload: JSON.parse(data) });
};

export const fetchUsers = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
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
  const token = JSON.parse(localStorage.getItem("EG-token"));
  const { employeeId, name, sex, accountType } = formValue;
  console.log(formValue)
  const schema = gql`
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
      }
    }
  `;
  await client(token).mutate({ mutation: schema });
  dispatch({ type: UPDATE_USER, payload: formValue });
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
  const token = JSON.parse(localStorage.getItem("EG-token"));
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

export const updateAvailability = (isDefault, employeeId, availability) => async (
  dispatch
) => {
  const token = JSON.parse(localStorage.getItem("EG-token"));
  availability = availability === 'reset' ? 'reset' : JSON.stringify(availability)
  const schema = gql`
    mutation {
      updateUser (
        employeeId: "${employeeId}"
        data: {
          ${
            isDefault ? "availability_default" : "availability_next"
          }: "${availability}"
        }
      ){
        availability_next
        availability_default
      }
    }
  `;
  const res = await client(token).mutate({ mutation: schema });
  const { availability_next, availability_default } = res.data.updateUser
  dispatch({ type: UPDATE_AVAILABILITY, payload: {
    availability_default: JSON.parse(availability_default),
    availability_next: JSON.parse(availability_next)
  }})
};

export const changeAvailability = (isDefault, index, availability) => async dispatch => {
  availability[index] = !availability[index]
  dispatch ({ type: CHANGE_AVAILABILITY, payload: {
    isDefault,
    availability
  }})
}