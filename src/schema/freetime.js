import { gql } from "apollo-boost";

export const schema_fetchMyFreetimes = gql`
  query MyFreetimes($schedule_No: String!) {
    myFreetimes(schedule_No: $schedule_No) {
      id
      schedule_day {
        day_No
      }
      availability
    }
  }
`;

export const schema_createFreetimes = gql`
  mutation CreateFreetimes($schedule_No: String!) {
    createFreetimes(schedule_No: $schedule_No) {
      count
    }
  }
`;
export const schema_updateFreetime = gql`
  mutation UpdateFreetime($id: ID!, $availability: String!) {
    updateFreetime(id: $id, data: { availability: $availability }) {
      id
      schedule_day {
        day_No
      }
      availability
    }
  }
`;

export const schema_resetFreetimes = gql`
  mutation ResetFreetime($schedule_No: String!) {
    deleteFreetimes(schedule_No: $schedule_No) {
      count
    }
  }
`;

export const schema_changeUseDefault = gql`
  mutation ChangeUseDefault($useDefaultFreetime: Boolean!) {
    updateUser(data: { useDefaultFreetime: $useDefaultFreetime }) {
      id
      employeeId
      name
      sex
      accountType
      useDefaultFreetime
    }
  }
`;

export const schema_fetchFreetimes = gql`
  query freetimes ($schedule_No: String!) {
    freetimes (schedule_No: $schedule_No) {
      schedule_day {
        day_No
      }
      staff {
        employeeId
        name
        sex
      }
      availability
    }
  }
`;