// import client from "../utils/getClient";
// import history from "../history";
// import { gql } from "apollo-boost";
// import {
//   FETCH_USER,
//   FETCH_AUTH,
//   LOGOUT,
//   CREATE_USER,
//   FETCH_USERS,
//   UPDATE_USER,
//   DELETE_USER,
//   FETCH_FREETIME,
//   UPDATE_FREETIME,
//   CHANGE_FREETIME,
//   CHANGE_USEDEFAULT,
// } from "./types";


// const parseData = (isDefault, data) => {
//   if (isDefault === undefined || isDefault ) {
//     data.freetime_default = JSON.parse(data.freetime_default);
//   } 
//   if (isDefault === undefined || !isDefault) {
//     data.freetime_next = JSON.parse(data.freetime_next);
//   }
//   return data;
// };

// export const fetchToken = () => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   if (token) {
//     dispatch({ type: FETCH_AUTH });
//     history.push("/dashboard");
//   } else {
//     dispatch({ type: LOGOUT });
//     history.push("/");
//   }
// };

// export const login = ({ employeeId, password }) => async (dispatch) => {
//   const schema = gql`
//     mutation {
//       login (
//         data: {
//           employeeId: "${employeeId}"
//           password: "${password}"
//         }
//       ) {
//         user {
//           id
//         }
//         token
//       }
//     }
//   `;
//   const res = await client(null).mutate({ mutation: schema });
//   sessionStorage.setItem("EG-token", JSON.stringify(res.data.login.token));
//   dispatch({ type: FETCH_AUTH });
//   history.push("/dashboard");
// };

// export const logout = () => async (dispatch) => {
//   sessionStorage.clear();
//   dispatch({ type: LOGOUT });
//   console.log('logout')
//   history.push("/");
// };

// export const fetchUser = () => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const schema = gql`
//     query {
//       me {
//         id
//         name
//         employeeId
//         accountType
//         sex
//       }
//     }
//   `;
//   const res = await client(token).query({ query: schema });
//   dispatch({ type: FETCH_USER, payload: res.data.me });
// };

// export const createUser = (formValue) => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const { employeeId, name, sex, accountType } = formValue;
//   const schema = gql`
//     mutation {
//       createUser (
//         auth: "Eg80949597"
//         data: {
//           employeeId: "${employeeId}"
//           name: "${name}"
//           sex: "${sex}"
//           accountType: "${accountType}"
//           password: "${employeeId}"
//         }
//       ) {
//         user {
//           employeeId
//           name
//           sex
//           accountType
//         }
//       }
//     }
//   `;
//   const freetimeSchema = gql`
//     mutation {
//       createFreetime (
//         employeeId: "${employeeId}"
//       ) {
//         id
//       }
//     }
//   `
//   await client(token).mutate({ mutation: schema });
//   await client(null).mutate({ mutation: freetimeSchema })
//   dispatch({ type: CREATE_USER, payload: formValue });
// };

// export const fetchUsers = () => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const schema = gql`
//     query {
//       users(orderBy: employeeId_ASC) {
//         employeeId
//         name
//         sex
//         accountType
//       }
//     }
//   `;
//   const res = await client(token).query({ query: schema });
//   dispatch({ type: FETCH_USERS, payload: res.data.users });
// };

// export const updateUser = (oldEmployeeId, formValue) => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   let data = "";
//   if (formValue.hasOwnProperty("password")) {
//     data = `password: "${formValue.password}"`;
//   } else {
//     const { employeeId, name, sex, accountType } = formValue;
//     data = `
//       employeeId: "${employeeId}"
//       name: "${name}"
//       sex: "${sex}"
//       accountType: "${accountType}"
//     `;
//   }
//   const combinedSchema =`
//     mutation {
//       updateUser (
//         employeeId: "${oldEmployeeId}"
//         data: {
//           `+ data +`
//         }
//       ) {
//           employeeId
//           name
//           sex
//           accountType
//       }
//     }
//   `;
//   const schema = gql`${combinedSchema}`
//   await client(token).mutate({ mutation: schema });
//   if (!formValue.hasOwnProperty("password")) {
//     dispatch({ type: UPDATE_USER, payload: formValue });
//   }
  
// };

// export const deleteUser = (employeeId) => async (dispatch) => {
//   const schema = gql`
//     mutation {
//       deleteUser (
//         employeeId: "${employeeId}"
//       ) {
//         employeeId
//       }
//     } 
//   `;
//   await client(null).mutate({ mutation: schema });
//   dispatch({ type: DELETE_USER, payload: employeeId });
// };

// export const resetPassword = (employeeId) => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const schema = gql`
//     mutation {
//       updateUser (
//         employeeId: "${employeeId}"
//         data: {
//           password: "${employeeId}"
//         }
//       ){
//       employeeId
//     } 
//   }
//   `;
//   await client(token).mutate({ mutation: schema });
// };
// //-----------------------------------------------------------------------//;
// export const fetchFreetime = () => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const schema = gql`
//     query {
//       myFreetimes {
//         freetime_next
//         freetime_default
//         useDefault
//       }
//     }
//   `;
//   const res = await client(token).query({ query: schema });
//   const parsedFreetime = parseData(undefined, res.data.myFreetimes[0])
//   dispatch({
//     type: FETCH_FREETIME,
//     payload: {
//       ...parsedFreetime,
//       useDefault: res.data.myFreetimes[0].useDefault,
//     },
//   });
// };

// export const updateFreetime = (isDefault, freetime) => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const key = isDefault ? "freetime_default" : "freetime_next";
//   const stringifyFreetime = JSON.stringify(freetime)
//   const schema = gql`
//     mutation {
//       updateFreetime (
//         data: {
//           ${key}: "${stringifyFreetime}"
//         }
//       ){
//         ${key}
//       }
//     }
//   `;
//   const res = await client(token).mutate({ mutation: schema });
//   dispatch({
//     type: UPDATE_FREETIME,
//     payload: parseData(isDefault, res.data.updateFreetime),
//   });
// };

// export const changeFreetime = (isDefault, index, freetime) => async (
//   dispatch
// ) => {
//   dispatch({
//     type: CHANGE_FREETIME,
//     payload: {
//       isDefault,
//       index,
//       freetime
//     }
//   });
// };

// export const resetFreetime = (isDefault) => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const key = isDefault ? "freetime_default" : "freetime_next";
//   const schema = gql`
//     mutation {
//       resetFreetime(
//         resetItem: "${key}"
//       ) {
//         ${key}
//       }
//     }
//   `;
//   const res = await client(token).mutate({ mutation: schema });
//   dispatch({
//     type: UPDATE_FREETIME,
//     payload: parseData(isDefault, res.data.resetFreetime),
//   });
// };

// export const changeUseDefault = (useDefault) => async (dispatch) => {
//   const token = JSON.parse(sessionStorage.getItem("EG-token"));
//   const schema = gql`
//     mutation {
//       updateFreetime (
//         data: {
//           useDefault: ${!useDefault}
//         }
//       ){
//         useDefault
//       }
//     }
//   `;
//   await client(token).mutate({ mutation: schema });
//   dispatch({ type: CHANGE_USEDEFAULT })
// };
