import React from "react";
import { Table } from "rsuite";
import StaffFormModal from './StaffFormModal'
import DeleteStaff from './DeleteStaff'
import ResetPassword from './ResetPassword'

const { Column, HeaderCell, Cell } = Table;
class StaffList extends React.Component {

  render() {
    return (
      <div>
        <Table height={420} data={JSON.parse(this.props.data)} width={680} hover>
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
  }
}

export default StaffList;
