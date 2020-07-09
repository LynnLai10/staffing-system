import { gql } from "apollo-boost";
const dataTemplate = `
  id
  name
  employeeId
  accountType
  sex
  position
  useDefaultFreetime
  hireDate
  permanentStaff
  lastLogin
`;

const variablesTemplate = `
  $employeeId: String!
  $name: String!
  $sex: String!
  $position: String!
  $hireDate: String!
  $permanentStaff: Boolean!
  $accountType: String!
`

const inputTemplate = `
  employeeId: $employeeId
  name: $name
  sex: $sex
  position: $position
  accountType: $accountType
  password: $employeeId
  hireDate: $hireDate
  permanentStaff: $permanentStaff
`

const schema_login_content = `
mutation Login($employeeId: String!, $password: String!) {
  login(data: { employeeId: $employeeId, password: $password }) {
    user {` 
    + dataTemplate +
    `} token
  }
}
`
export const schema_login = gql`${schema_login_content}`
//------------------------------------------------------------------
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
//-------------------------------------------------------------------
const schema_staffList_content = `
  query Users {
    users(orderBy: employeeId_ASC) {` 
    + dataTemplate + 
  `}
  }
`;
export const schema_staffList = gql`${schema_staffList_content}`;
//--------------------------------------------------------------------
const schema_createStaff_content = `
  mutation CreateUser(`
   + variablesTemplate +  
  `) {
    createUser(
      data: {`
       + inputTemplate +  
      `}
    ){` + dataTemplate + 
    `}
  }
`;
export const schema_createStaff = gql`${schema_createStaff_content}`;
//----------------------------------------------------------------------
const schema_updateStaff_content = `
  mutation UpdateUser(
    $originalId: String!`
    + variablesTemplate +
  `) {
    updateUser(
      employeeId: $originalId
      data: {`
        + inputTemplate + 
      `}
    ) {`
      + dataTemplate + 
    `}
  }
`;
export const schema_updateStaff = gql`${schema_updateStaff_content}`;
//----------------------------------------------------------------------
const schema_deleteStaff_content = `
  mutation DeleteUser($employeeId: String!) {
    deleteUser(employeeId: $employeeId) {`
      + dataTemplate + 
    `}
  }
`;
export const schema_deleteStaff = gql`${schema_deleteStaff_content}`;
//--------------------------------------------------------------------------
export const schema_resetPassword = gql`
  mutation ResetPassword($employeeId: String!) {
    updateUser(employeeId: $employeeId, data: { password: $employeeId }) {
      employeeId
    }
  }
`;
//---------------------------------------------------------------------------
const schema_me_content = `
  query {
    me {`
      + dataTemplate +
    `}
  }
`;
export const schema_me = gql`${schema_me_content}`;
