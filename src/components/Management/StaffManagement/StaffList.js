import React from "react";
import moment from "moment";
import { Query } from "@apollo/react-components";
import { schema_staffList } from "../../../schema/user";
import StaffFormModal from "./StaffFormModal";
import DeleteStaff from "./DeleteStaff";
import ResetPassword from "./ResetPassword";
import { Table, Loader, Alert, Icon } from "rsuite";
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
              <Table
                data={data.users}
                width={800}
                rowClassName={(rowData) => {
                  if (rowData && rowData.sex === "Male") {
                    return 'staffList__tallyClerk'
                  } else if (rowData && rowData.sex === "Female") {
                    return 'staffList__casher'
                  } else {
                    return ''
                  }
                }}
                autoHeight
                hover
              >
                <Column width={100} align="center">
                  <HeaderCell>Employee ID</HeaderCell>
                  <Cell dataKey="employeeId" />
                </Column>

                <Column width={120} align="center">
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

                <Column width={150} align="center">
                  <HeaderCell>Hire Date</HeaderCell>
                  <Cell>
                    {(rowData) =>
                      rowData.hireDate
                        ? moment(new Date(rowData.hireDate)).format(
                            "DD/MM/YYYY"
                          )
                        : ""
                    }
                  </Cell>
                </Column>

                <Column width={80} align="center">
                  <HeaderCell>Permanent</HeaderCell>
                  <Cell>
                    {(rowData) => {
                      return (
                        <Icon
                          icon={
                            rowData.permanentStaff
                              ? "check-circle"
                              : "close-circle"
                          }
                        />
                      );
                    }}
                  </Cell>
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
