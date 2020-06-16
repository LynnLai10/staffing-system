import { gql } from "apollo-boost";

export const schema_fetchSchedule = gql`
  query FetchSchedule {
    schedules {
      id
      schedule_No
      schedule_days {
        id
        day_No
        schedule_staffs {
          id
          schedule_interval {
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

export const schema_fetchStaffList = gql`
  query fetchStaffList(
    $availability: String!
    $day_No: String!
  ) {
    freetimes(day_No: $day_No, availability: $availability) {
      id
      user {
        employeeId
        name
        sex
      }
    }
  }
`;

export const schema_createSchedule = gql`
  mutation CreateSchedule ($schedule_No: String!) {
    createSchedule (
      schedule_No: $schedule_No
    ){
      id
      schedule_No
      schedule_days {
        id
        day_No
        schedule_staffs {
          id
          schedule_interval {
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
  mutation UpdateStaffs ($oldStaffs: [UpdateScheduleStaffsInput] $newStaffs: [UpdateScheduleStaffsInput]) {
    updateSchedule_Staffs (
      oldStaffs: $oldStaffs
      newStaffs: $newStaffs
    ) {
      count
    }
  }
`
