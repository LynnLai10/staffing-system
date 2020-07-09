import React from "react";
import { Query, Mutation } from "@apollo/react-components";
import {
  schema_createFreetimes,
  schema_fetchMyFreetimes,
} from "../../schema/freetime";
import FreetimePeriod from "./FreetimePeriod";
import FreetimeReset from "./FreetimeReset";
import FreetimeCasher from "./FreetimeCasher";
import FreetimeTallyClerk from "./FreetimeTallyClerk";
import { ButtonToolbar, Loader, Alert } from "rsuite";

class FreetimeForm extends React.Component {
  renderFreetime = (freetimes) => {
    const { isDefault, isTallyClerk } = this.props;
    const { schedule_No, startDate, endDate, days, dates } = this.props.dates;
    return (
      <div className="freetimeForm__container">
        <div className="freetimeForm__panel">
          <FreetimePeriod
            isDefault={isDefault}
            startDate={startDate}
            endDate={endDate}
          />
          <div className="freetimeForm__panelTitle">
            {days.map((item) => (
              <h5 key={item}>{item}</h5>
            ))}
          </div>
          <div className="freetimeForm__panelItem">
            {isTallyClerk
              ? freetimes.map((item, index) => (
                  <FreetimeTallyClerk
                    item={item}
                    key={index}
                    index={index}
                    dates={dates}
                    isDefault={isDefault}
                  />
                ))
              : freetimes.map((item, index) => (
                  <FreetimeCasher
                    item={item}
                    key={index}
                    index={index}
                    dates={dates}
                    isDefault={isDefault}
                  />
                ))}
          </div>
          <ButtonToolbar className="freetimeForm__footer">
            <FreetimeReset isDefault={isDefault} schedule_No={schedule_No} />
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
          query={schema_fetchMyFreetimes}
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
                            query: schema_fetchMyFreetimes,
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

export default FreetimeForm;
