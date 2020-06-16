import { gql } from "apollo-boost";

export const schema_login = gql`
  mutation Login($employeeId: String!, $password: String!) {
    login(data: { employeeId: $employeeId, password: $password }) {
      user {
        id
        name
        employeeId
        accountType
        sex
        useDefaultFreetime
      }
      token
    }
  }
`;

export const schema_changePassword = gql`
  mutation ChangePassword(
    $employeeId: String!
    $currentPassword: String!
    $password: String!
  ) {
    changePassword(
      employeeId: $employeeId
      data: { currentPassword: $currentPassword, password: $password }
    ) {
      id
    }
  }
`;

export const schema_staffList = gql`
  query Users {
    users(orderBy: employeeId_ASC) {
      id
      employeeId
      name
      sex
      accountType
      useDefaultFreetime
    }
  }
`;

export const schema_createStaff = gql`
  mutation CreateUser(
    $employeeId: String!
    $name: String!
    $sex: String!
    $accountType: String!
  ) {
    createUser(
      auth: "Eg80949597"
      data: {
        employeeId: $employeeId
        name: $name
        sex: $sex
        accountType: $accountType
        password: $employeeId
      }
    ) {
      id
      employeeId
      name
      sex
      accountType
      useDefaultFreetime
    }
  }
`;
export const schema_updateStaff = gql`
  mutation UpdateUser(
    $originalId: String!
    $employeeId: String!
    $name: String!
    $sex: String!
    $accountType: String!
  ) {
    updateUser(
      employeeId: $originalId
      data: {
        employeeId: $employeeId
        name: $name
        sex: $sex
        accountType: $accountType
      }
    ) {
      id
      employeeId
      name
      sex
      accountType
      useDefaultFreetime
    }
  }
`;

export const schema_deleteStaff = gql`
  mutation DeleteUser($employeeId: String!) {
    deleteUser(employeeId: $employeeId) {
      id
      employeeId
      name
      sex
      accountType
      useDefaultFreetime
    }
  }
`;

export const schema_resetPassword = gql`
  mutation ResetPassword($employeeId: String!) {
    updateUser(employeeId: $employeeId, data: { password: $employeeId }) {
      employeeId
    }
  }
`;

export const schema_me = gql`
  query {
    me {
      id
      employeeId
      name
      sex
      accountType
      useDefaultFreetime
    }
  }
`