import React from "react";
import { Mutation } from "@apollo/react-components";
import { schema_updateFreetime } from "../../schema/freetime";
import { ButtonGroup, Button } from "rsuite";

class FreetimeTallyClerk extends React.Component {
  handleClick = (updateFreetime, item, isFull) => {
    let { id, availability } = item;
    if (availability !== "half" && !isFull) {
      availability = "half";
    } else if (availability !== "full" && isFull) {
      availability = "full";
    } else {
      availability = "no";
    }
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
          <div>
            <p className="freetimeTallyClerk__date">{isDefault? index+1 : dates[index]}</p>
            <ButtonGroup vertical className="freetime__btn">
              <Button
                appearance={item.availability === "half" ? "primary" : "ghost"}
                onClick={() => this.handleClick(updateFreetime, item, false)}
                className="freetimeTallyClerk__btn"
              >
                HALF
              </Button>
              <Button
                appearance={item.availability === "full" ? "primary" : "ghost"}
                onClick={() => this.handleClick(updateFreetime, item, true)}
                className="freetimeTallyClerk__btn"
              >
                FULL
              </Button>
            </ButtonGroup>
          </div>
        )}
      </Mutation>
    );
  }
}

export default FreetimeTallyClerk;
