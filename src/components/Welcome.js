import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Query } from "@apollo/react-components";
import { schema_mySchedule } from "../schema/schedule";
import FreetimePeriod from "./Freetime/FreetimePeriod";
import getDate from "../utils/getDate";
import { Panel, Row, Col, Icon, Table, Loader, Alert } from "rsuite";
const { Column, HeaderCell, Cell, Pagination } = Table;
require("moment-precise-range-plugin");

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.dates = getDate(true);
  }
  filterData = (data) => {
    //Schedule initialization
    const firstWeek = {
      week: "1st",
    };
    for (let i = 0; i < 7; i++) {
      firstWeek[this.props.dates.days[i]] = "-";
    }
    const secondWeek = {
      ...firstWeek,
      week: "2nd",
    };

    //import data
    for (let i = 0; i < data.length; i++) {
      const day_No = data[i].schedule_day.day_No.split("_")[1];
      if (day_No < 7) {
        firstWeek[this.props.dates.days[day_No]] =
          data[i].schedule_interval.interval_No;
      } else {
        secondWeek[this.props.dates.days[day_No - 7]] =
          data[i].schedule_interval.interval_No;
      }
    }
    return [firstWeek, secondWeek];
  };
  renderUser = () => {
    const { name, employeeId, sex, accountType } = this.props.user;
    return (
      <Panel bordered className="welcome__user">
        <Row>
          <Col md={8} className={`welcome__user__icon ${sex === "Male" ? "tallyClerk" : "casher"}`}>
            <Icon icon="user-o" size="5x" />
          </Col>
          <Col md={5}>
            <p>Name:</p>
            <p>ID:</p>
            <p>Postion:</p>
          </Col>
          <Col md={11}>
            <p>{name}</p>
            <p>{employeeId}</p>
            <p>
              {accountType === "Admin"
                ? sex === "Male"
                  ? "Manager"
                  : "Assistant Manager"
                : sex === "Male"
                ? "Tally Clerk"
                : "Casher"}
            </p>
          </Col>
        </Row>
      </Panel>
    );
  };
  renderLastLogin = () => {
    const { sex, hireDate, lastLogin } = this.props.user;
    const employeedDays = moment(new Date(hireDate)).format("YYYY-MM-DD");
    const now = moment().format("YYYY-MM-DD");
    return (
      <Panel bordered className="welcome__lastLogin">
        <Row>
          <Col md={6} className={`welcome__user__icon ${sex === "Male" ? "tallyClerk" : "casher"}`}>
            <Icon icon="calendar" size="5x" />
          </Col>
          <Col md={6} >
            <p className="welcome__lastlogin__first">Last Login:</p>
            <p>On Board:</p>
          </Col>
          <Col md={12}>
            <p>{moment(lastLogin).format("dddd, Do MMM YYYY, HH:mm")}</p>
            <p>{moment(employeedDays).preciseDiff(now)}</p>
          </Col>
        </Row>
      </Panel>
    );
  };
  render() {
    const { schedule_No, startDate, endDate } = this.dates;
    return (
      <div className="welcome__container">
        <Row>
          <Col md={12}>{this.renderUser()}</Col>
          <Col md={12}>{this.renderLastLogin()}</Col>
        </Row>
        <Query query={schema_mySchedule} variables={{ schedule_No }}>
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
            const mySchedule = this.filterData(data.mySchedule);
            return (
              <div>
                <Panel bordered >
                  <FreetimePeriod startDate={startDate} endDate={endDate} />
                  <Table width={800} data={mySchedule} autoHeight >
                    <Column width={100} align="center" fixed>
                      <HeaderCell>Week</HeaderCell>
                      <Cell dataKey="week" />
                    </Column>
                    {this.props.dates.days.map((item) => {
                      return (
                        <Column width={100} fixed align="center" key={item}>
                          <HeaderCell>{item}</HeaderCell>
                          <Cell dataKey={item} />
                        </Column>
                      );
                    })}
                  </Table>
                </Panel>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user: user.user,
    dates: user.dates,
  };
};

export default connect(mapStateToProps)(Welcome);
