// import client from "../utils/getClient";
// import { gql } from "apollo-boost";

// export default (i, schedule_No, employeeId, position, interval_No) => {
//   const schema = gql`
//     mutation {
//       createSchedule_Staff(
//         data: {
//           day_No: "${schedule_No}_${i}"
//           schedule_No: "${schedule_No}"
//           position: "${position}"
//           interval_No: "${interval_No}"
//           employeeId: "${employeeId}"
//         }
//       ){
//         id
//       }
//     }
//   `;
//   client(null).mutate({ mutation: schema });
// };