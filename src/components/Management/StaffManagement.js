import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions'
import StaffList from './StaffList'
import NewStaff from './NewStaff'

class StaffManagement extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    return (
      <div>
        <NewStaff />
        {this.props.users && <StaffList data={JSON.stringify(this.props.users)}/>}
      </div>
    )
  } 
}
const mapStateToProps = ({users}) => {
  return { users }
}

export default connect(mapStateToProps, actions)(StaffManagement)