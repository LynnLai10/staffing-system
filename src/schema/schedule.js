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

export const schema_updateStaffs = gql`
  mutation UpdateStaffs(
    $oldStaffs: [UpdateScheduleStaffsInput]
    $newStaffs: [UpdateScheduleStaffsInput]
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

