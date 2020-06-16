// import client from "../utils/getClient";
// import { gql } from "apollo-boost";
// import { UPDATE_STAFFS } from "./types";
// // import createStaff from './utils/createStaff'

// export const updateStaffs = (data, staffs) => async (dispatch) => {
//   dispatch({
//     type: UPDATE_STAFFS,
//     payload: {
//       day_No: data.day_No,
//       staffs,
//     },
//   });
//   //deleted staff
//   const oldId = data.schedule_staffs.map((item) => item.id);
//   const newId = staffs.map((item) => item.id);
//   const deletedId = oldId.filter((item) => !newId.includes(item));
//   if (deletedId) {
//     for (let i = 0; i < deletedId.length; i++) {
//       const schema = gql`
//         mutation {
//           deleteSchedule_Staff(
//             id: "${deletedId[i]}"
//           ){
//           id
//          }
//         } 
//       `;
//       await client(null).mutate({ mutation: schema });
//     }
//   }

//   for (let i = 0; i < staffs.length; i++) {
//     let { id, position, staff, schedule_interval } = staffs[i];
//     if (!staff) {
//       staff = {
//         employeeId: "",
//       };
//     }
//     //create new Staff
//     if (!id) {
//       const schema = gql`
//         mutation {
//           createSchedule_Staff(
//             data: {
//               day_No: "${data.day_No}"
//               schedule_No: "${data.day_No.split("_")[0]}"
//               position: "${position}"
//               interval_No: "${schedule_interval.start}-${schedule_interval.end}"
//               employeeId: "${staff.employeeId}"
//             }
//           ) { 
//             id
//           }
//         } 
//       `;
//       await client(null).mutate({ mutation: schema });
//     } else {
//       //whether data changes
//       const schema_changes = gql`
//         query {
//           schedule_staff (
//             id: "${id}"
//           ) {
//             schedule_interval {
//               interval_No
//             }
//             staff {
//               employeeId
//             }
//           }
//         }`;
//       const res = await client(null).query({ query: schema_changes });
//       if (!res.data.schedule_staff.staff) {
//         res.data.schedule_staff.staff = {
//           employeeId: "",
//         };
//       }
//       let isChange =
//         res.data.schedule_staff.schedule_interval.interval_No !==
//           schedule_interval.interval_No ||
//         !!res.data.schedule_staff.staff.employeeId !== !!staff.employeeId;

//       //update exist Staff
//       if (isChange) {
//         const schema = gql`
//         mutation {
//           updateSchedule_Staff(
//             data: {
//               id: "${id}"
//               interval_No: "${schedule_interval.start}-${schedule_interval.end}"
//               employeeId: "${staff.employeeId}"
//             }
//           ){
//            id
//           }
//         } 
//       `;
//         console.log(staff);
//         await client(null).mutate({ mutation: schema });
//       }
//     }
//   }
// };
