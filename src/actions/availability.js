import client from "../utils/getClient";
import { gql } from "apollo-boost";
import {
  UPDATE_AVAILABILITY,
  CHANGE_AVAILABILITY
} from "./types";


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

// export const resetAvailability = (isDefault, employeeId) => async (
//   dispatch
// ) => {
//   const token = JSON.parse(localStorage.getItem("EG-token"));
//   const schema = gql`
//     mutation {
//       resetAvailability (
//         employeeId: "${employeeId}"
//         isDefault: ${isDefault}
//       ){
//         availability_next
//         availability_default
//       }
//     }
//   `;
//   const res = await client(token).mutate({ mutation: schema });
//   console.log(res.data)
//   const { availability_next, availability_default } = res.data.resetAvailability
//   dispatch({ type: RESET_AVAILABILITY, payload: {
//     availability_default,
//     availability_next
//   }})
// };

export const changeAvailability = (isDefault, index, availability) => async dispatch => {
  availability[index] = !availability[index]
  dispatch ({ type: CHANGE_AVAILABILITY, payload: {
    isDefault,
    availability
  }})
}