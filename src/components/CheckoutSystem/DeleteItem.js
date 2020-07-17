import React from "react";
import axios from "axios";
import { Mutation } from "@apollo/react-components";
import { schema_deleteItem, schema_items } from "../../schema/item";
import { Modal, Button, Icon, IconButton, Alert } from "rsuite";
import serverUrl from '../../serverUrl'

class DeleteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  close = () => {
    this.setState({ show: false });
  };
  open = () => {
    this.setState({ show: true });
  };
  handleSubmit = (deleteItem) => {
    console.log(this.props.imgURLs)
    const { id } = this.props.data;
    const { category, imgURLs } = this.props;
    const fileNames = imgURLs.map(item => item.split("/").pop())
    deleteItem({
      variables: {
        id,
      },
      refetchQueries: [
        { query: schema_items, variables: this.props.variables },
      ],
    });
    //delete img.jpg at public/img
    if (fileNames.length !== 0)
      for (let i = 0; i < fileNames.length; i++) {
        axios.delete(`${serverUrl(process.env.NODE_ENV === "development")}checkout/delete/${category}/${fileNames[i]}`);
      }
  };
  render() {
    const { show } = this.state;
    const { description_en, description_cn } = this.props.data;
    return (
      <div>
        <IconButton
          appearance="subtle"
          onClick={this.open}
          icon={<Icon icon="trash" />}
          className="staffList__btn"
        />
        <Mutation
          mutation={schema_deleteItem}
          onCompleted={() => Alert.success("Success.")}
        >
          {(deleteItem) => (
            <div>
              {show && (
                <Modal
                  backdrop="static"
                  show={show}
                  onHide={this.close}
                  size="xs"
                >
                  <Modal.Header>
                    <Modal.Title>Delete Item</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Icon
                      icon="remind"
                      style={{
                        color: "#ffb300",
                        fontSize: 24,
                      }}
                    />{" "}
                    Are you sure you want to delete this item: <br />{" "}
                    {description_en}-{description_cn}?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => {
                        this.handleSubmit(deleteItem);
                        this.close();
                      }}
                      href=""
                      appearance="primary"
                    >
                      Delete
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default DeleteItem;
