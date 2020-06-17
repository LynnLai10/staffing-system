import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/freetime";
import { Query, Mutation } from "@apollo/react-components";
import {
  schema_updateFreetime,
  schema_createFreetimes,
  schema_fetchFreetimes,
} from "../../schema/freetime";
import FreetimePeriod from "./FreetimePeriod";
import FreetimeReset from "./FreetimeReset";
import { ButtonToolbar, Button, Loader, Alert } from "rsuite";

class FreetimeForm extends React.Component {
  handleClick = (updateFreetime, item) => {
    let { id, availability } = item;
    availability = availability === "no" ? "full" : "no";
    updateFreetime({
      variables: {
        id,
        availability,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateFreetime: {
          ...item,
          availability,
        },
      },
    });
  };

  renderFreetime = (freetimes) => {
    const { isDefault } = this.props;
    const { schedule_No, startDate, endDate, days, dates } = this.props.dates;
    return (
      <div className="scheduleForm__container">
        <div className="scheduleForm__panel">
          <FreetimePeriod
            isDefault={isDefault}
            startDate={startDate}
            endDate={endDate}
          />
          <div className="scheduleForm__panelTitle">
            {days.map((item) => (
              <h5 key={item}>{item}</h5>
            ))}
          </div>
          <div className="scheduleForm__panelItem">
            {freetimes.map((item, index) => (
              <Mutation key={index} mutation={schema_updateFreetime}>
                {(updateFreetime) => (
                  <Button
                    appearance={
                      item.availability === "full" ? "primary" : "ghost"
                    }
                    className="scheduleForm__btn"
                    onClick={() => this.handleClick(updateFreetime, item)}
                  >
                    {isDefault ? index + 1 : dates[index]}
                  </Button>
                )}
              </Mutation>
            ))}
          </div>
          <ButtonToolbar className="scheduleForm__footer">
            <FreetimeReset
              isDefault={isDefault}
              schedule_No={schedule_No}
            />
          </ButtonToolbar>
        </div>
      </div>
    );
  };

  render() {
    const { isDefault } = this.props;
    const schedule_No = isDefault ? "0" : this.props.dates.schedule_No;
    return (
      <div>
        <Query
          query={schema_fetchFreetimes}
          variables={{
            schedule_No,
          }}
        >
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
            const freetimes = data.myFreetimes;
            if (freetimes.length === 0) {
              return (
                <Mutation mutation={schema_createFreetimes}>
                  {(createFreetimes, { loading, error, data }) => {
                    if (loading) {
                      return (
                        <Loader
                          backdrop
                          center
                          size="md"
                          content={`Creating ...`}
                          vertical
                        />
                      );
                    }
                    if (error) {
                      return Alert.error("Failed. Please try again.");
                    }
                    if (!data) {
                      createFreetimes({
                        variables: { schedule_No },
                        refetchQueries: [
                          {
                            query: schema_fetchFreetimes,
                            variables: { schedule_No },
                          },
                        ],
                      });
                    } else {
                      return this.renderFreetime(freetimes);
                    }
                  }}
                </Mutation>
              );
            } else {
              return this.renderFreetime(freetimes);
            }
          }}
        </Query>
      </div>
    );
  }
}
// const mapStateToProps = ({ user }, ownProps) => {
//   const { freetime_next, freetime_default } = user;
//   return {
//     freetime: ownProps.isDefault ? freetime_default : freetime_next,
//   };
// };

export default connect(null, actions)(FreetimeForm);

// update={(cache, { data: { updateFreetime } }) => {
//   let { myFreetimes } = cache.readQuery({ query: schema_fetchFreetime, variables: { schedule_No: item.day_No.split('_')[0] } })
//   myFreetimes.splice(index, 1, updateFreetime)
//   cache.writeQuery({
//     query: schema_fetchFreetime,
//     variables: { schedule_No: item.day_No.split('_')[0] },
//     data: { myFreetimes: myFreetimes.concat() }
//   })
// }}
