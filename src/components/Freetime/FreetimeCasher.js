import React from "react";
import { Mutation } from "@apollo/react-components";
import { schema_updateFreetime } from "../../schema/freetime";
import { Button } from "rsuite";

class FreetimeCasher extends React.Component {
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

  render() {
    const { isDefault, dates, index, item } = this.props;
    return (
      <Mutation key={index} mutation={schema_updateFreetime}>
        {(updateFreetime) => (
          <Button
            className="freetime__btn freetimeCahser__btn"
            onClick={() => this.handleClick(updateFreetime, item)}
            active={item.availability === "full" ? false : true}
          >
            {isDefault ? index + 1 : dates[index]}
          </Button>
        )}
      </Mutation>
    );
  }
}

export default FreetimeCasher;
