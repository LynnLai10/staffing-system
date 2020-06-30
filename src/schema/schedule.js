import { gql } from "apollo-boost";

export const schema_fetchSchedule = gql`
  query FetchSchedule($schedule_No: String!) {
    schedule(schedule_No: $schedule_No) {
      id
      schedule_days {
        id
        day_No
        schedule_staffs {
          id
          schedule_interval {
            interval_No
            start
            end
          }
          position
          staff {
            employeeId
            name
          }
        }
      }
    }
  }
`;

export const schema_createSchedule = gql`
  mutation createSchedule($schedule_No: String!) {
    createSchedule(schedule_No: $schedule_No) {
      count
    }
  }
`;

export const schema_updateStaffs = gql`
  mutation UpdateStaffs(
    $oldStaffs: [UpdateSchedule_StaffsInput]
    $newStaffs: [UpdateSchedule_StaffsInput]
  ) {
    updateSchedule_Staffs(oldStaffs: $oldStaffs, newStaffs: $newStaffs) {
      count
    }
  }
`;

export const schema_resetSchedule = gql`
  mutation DeleteSchedule_Staffs($schedule_No: String!) {
    deleteSchedule_Staffs(schedule_No: $schedule_No) {
      count
    }
  }
`;

export const schema_mySchedule = gql`
  query mySchedule ($schedule_No: String!) {
    mySchedule(schedule_No: $schedule_No) {
      id
      schedule_day {
        day_No
      }
      schedule_interval {
        interval_No
      }
    }
  }
`
