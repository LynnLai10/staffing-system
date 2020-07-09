import React from "react";
import { connect } from "react-redux";
import ItemFormModal from "./ItemFormModal";
import DeleteItem from "./DeleteItem";
import { Panel, FlexboxGrid, ButtonGroup, Carousel } from "rsuite";

class Item extends React.Component {
  render() {
    const { category, data, variables, items, imgURLs } = this.props;
    const { id, description_en, description_cn } = this.props.data;
    return (
      <FlexboxGrid.Item key={id}>
        <Panel shaded bordered bodyFill className="itemsList__panel">
          {imgURLs.length !== 0 && (
            <div>
              {imgURLs.length === 1 ? (
                <img
                  src={imgURLs[0]}
                  alt="rice"
                  className="itemsList__carousel"
                />
              ) : (
                <Carousel autoplay className="itemsList__carousel">
                  {imgURLs.map((imgURL) => (
                    <img
                      src={imgURL + "?r=" + Math.random().toString()}
                      alt={category}
                      key={imgURL.split(",").pop()}
                    />
                  ))}
                </Carousel>
              )}
            </div>
          )}
          <div>
            <div className="itemsList__description">
              <h5>{description_en}</h5>
              <h5>{description_cn}</h5>
            </div>
            {this.props.user.accountType === "Admin" && (
              <ButtonGroup className="itemsList__btn">
                <ItemFormModal
                  category={category}
                  isEdit
                  data={data}
                  items={items}
                  imgURLs={imgURLs}
                  variables={variables}
                />
                <DeleteItem
                  category={category}
                  data={data}
                  variables={variables}
                />
              </ButtonGroup>
            )}
          </div>
        </Panel>
      </FlexboxGrid.Item>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user: user.user };
};

export default connect(mapStateToProps)(Item);
