import React from "react";
import { Query } from "@apollo/react-components";
import { schema_staffList } from "../../../schema/user";
import StaffFormModal from "./StaffFormModal";
import DeleteStaff from "./DeleteStaff";
import ResetPassword from "./ResetPassword";
import { Table, Loader, Alert } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
class StaffList extends React.Component {
  render() {
    return (
      <Query query={schema_staffList}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <Loader
                backdrop
                center
                size="md"
                content={`Loading...`}
                vertical
              />
            );
          }
          if (error) {
            return Alert.error("Failed. Please try again.");
          }
          return (
            <div>
              <Table height={420} data={data.users} width={680} hover>
                <Column width={100} align="center">
                  <HeaderCell>Employee ID</HeaderCell>
                  <Cell dataKey="employeeId" />
                </Column>

                <Column width={180} align="center">
                  <HeaderCell>Name</HeaderCell>
                  <Cell dataKey="name" />
                </Column>

                <Column width={80} align="center">
                  <HeaderCell>Sex</HeaderCell>
                  <Cell dataKey="sex" />
                </Column>

                <Column width={100} align="center">
                  <HeaderCell>Account Type</HeaderCell>
                  <Cell dataKey="accountType" />
                </Column>

                <Column width={150} fixed="right" align="center">
                  <HeaderCell>Action</HeaderCell>

                  <Cell>
                    {(rowData) => {
                      return (
                        <span className="staffList__groupBtn">
                          <StaffFormModal data={rowData} isEdit />|
                          <ResetPassword Password data={rowData} />|
                          <DeleteStaff data={rowData} />
                        </span>
                      );
                    }}
                  </Cell>
                </Column>
              </Table>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default StaffList;
