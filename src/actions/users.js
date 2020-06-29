import history from "../history";
import {
  FETCH_USER,
  FETCH_AUTH,
  LOGOUT,
} from "./types";

export const fetchToken = () => async (dispatch) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  if (token) {
    dispatch({ type: FETCH_AUTH });
    history.push("/dashboard/welcome");
  } else {
    dispatch({ type: LOGOUT });
    history.push("/");
  }
};

export const login = (data) => async (dispatch) => {
  sessionStorage.setItem("EG-token", JSON.stringify(data.data.login.token));
  dispatch({ type: FETCH_AUTH });
  dispatch({ type: FETCH_USER, payload: data.data.login.user })
  history.push("/dashboard/welcome");
};

export const logout = () => async (dispatch) => {
  sessionStorage.clear();
  dispatch({ type: LOGOUT });
  console.log("logout");
  history.push("/");
};

export const updateUser = (data) => async (dispatch) => {
  dispatch({ type: FETCH_USER, payload: data})
};
