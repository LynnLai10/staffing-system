import React from "react";
import axios from "axios";
import { Mutation } from "@apollo/react-components";
import serverUrl from '../../serverUrl'
import {
  schema_createItem,
  schema_updateItem,
  schema_items,
} from "../../schema/item";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Modal,
  Button,
  Slider,
  Schema,
  IconButton,
  Icon,
  Loader,
  Alert,
  Uploader,
} from "rsuite";

const { StringType } = Schema.Types;
const model = Schema.Model({
  description_en: StringType().isRequired("This field is required."),
  description_cn: StringType().isRequired("This field is required."),
});

class CustomField extends React.PureComponent {
  render() {
    const { name, message, label, accepter, error, ...props } = this.props;
    return (
      <FormGroup className={error ? "has-error" : "staffForm__modal"}>
        <ControlLabel>{label} </ControlLabel>
        <FormControl
          name={name}
          accepter={accepter}
          errorMessage={error}
          {...props}
        />
        <HelpBlock>{message}</HelpBlock>
      </FormGroup>
    );
  }
}

class ItemFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      formValue: {
        description_en: "",
        description_cn: "",
        popularity: 3,
        category: this.props.category,
        fileKeys: "",
      },
      formError: {},
      show: false,
      id: "",
      uploadFiles: [],
      removeFiles: [],
    };
    this.state = Object.assign({}, this.initialState);
  }
  //modal function
  close = () => {
    this.setState(this.initialState);
  };
  open = () => {
    this.setState({ show: true });
    if (this.props.isEdit) {
      const { data, imgURLs } = this.props;
      delete data.__typename;
      this.setState({
        id: data.id,
        formValue: data,
        uploadFiles: imgURLs.map((item, index) => ({
          name: item.split("/").pop(),
          fileKey: data.fileKeys.split(",")[index],
          url: item,
        })),
      });
    }
  };
  handleChange = (value) => {
    this.setState({
      formValue: value,
    });
  };
  handleSubmit = (mutate) => {
    if (!this.form.check()) {
      Alert.error("Error");
    } else {
      const { id, formValue } = this.state;
      const variables = this.props.isEdit
        ? formValue
        : {
            ...formValue,
            id,
          };
      mutate({
        variables,
        refetchQueries: [
          {
            query: schema_items,
            variables: this.props.variables,
          },
        ],
      });
      this.uploader.start()
    }
  };
  handleMutationComplete = () => {
    const { removeFiles } = this.state;
    this.close();
    Alert.success("Success.");
    if (removeFiles.length !== 0) {
      for (let i = 0; i < removeFiles.length; i++) {
        axios.delete(
          `${serverUrl(process.env.NODE_ENV === "development")}checkout/delete/${this.props.category}/${removeFiles[i].name}`
        );
      }
    }
  };

  //uplaod function
  handleUploaderChange = (value) => {
    this.setState((prevState) => ({
      formValue: {
        ...prevState.formValue,
        fileKeys: value.map((item) => item.fileKey).join(","),
      },
      uploadFiles: value,
    }));
  };
  handleRemove = (value) => {
    if (!value.hasOwnProperty("blobFile")) {
      this.setState((prevState) => ({
        removeFiles: [...prevState.removeFiles, value],
      }));
    }
  };
  render() {
    const { isEdit, category } = this.props;
    const { formValue, show, formError, uploadFiles } = this.state;
    const schema = isEdit ? schema_updateItem : schema_createItem;
    return (
      <div>
        <Modal show={show} onHide={this.close} size="xs">
          <Mutation mutation={schema} onCompleted={this.handleMutationComplete}>
            {(mutate, { loading, error }) => {
              const uploadData = {
                fileKeys: formValue.fileKeys,
                originalName: uploadFiles.map((item) => item.name).join(","),
              };
              return (
                <div>
                  <Modal.Header>
                    <Modal.Title>{isEdit ? "Edit" : "New"} Item</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    <Form
                      fluid
                      ref={(ref) => (this.form = ref)}
                      onChange={this.handleChange}
                      formValue={formValue}
                      model={model}
                      onCheck={(formError) => {
                        this.setState({ formError });
                      }}
                    >
                      <CustomField
                        name="description_en"
                        label={`${
                          category === "rice" ? "Brand Name" : "Description"
                        } in English`}
                        error={formError.description_en}
                      />
                      <CustomField
                        name="description_cn"
                        label={`${
                          category === "rice" ? "Brand Name" : "Description"
                        } in Chinese`}
                        error={formError.description_cn}
                      />
                      <CustomField
                        name="popularity"
                        label="Popularity"
                        accepter={Slider}
                        min={1}
                        setp={1}
                        max={5}
                        graduated
                        progress
                        renderMark={(mark) => {
                          switch (mark) {
                            case 5:
                              return "High";
                            case 3:
                              return "Middle";
                            case 1:
                              return "Low";
                            default:
                              return "";
                          }
                        }}
                        className="itemFormModal___slider"
                      ></CustomField>
                      <div>
                        <Uploader
                          autoUpload={false}
                          action={`http://localhost:4000/checkout/${category}`}
                          encType="multipart/form-data"
                          name="checkout"
                          onChange={this.handleUploaderChange}
                          onRemove={this.handleRemove}
                          data={uploadData}
                          defaultFileList={uploadFiles}
                          accept="image/*"
                          listType="picture"
                          multiple
                          disabled={uploadFiles.length > 2}
                          ref={(ref) => {
                            this.uploader = ref;
                          }}
                        />
                      </div>
                      <small>
                        {uploadFiles.length < 4
                          ? `File number limit: ${3 - uploadFiles.length}`
                          : "Exceed the maximum upload amount, please delete files."}
                      </small>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      appearance="primary"
                      onClick={() => {
                        this.handleSubmit(mutate);
                      }}
                      type="submit"
                      disabled={!uploadFiles.length || uploadFiles.length > 3}
                    >
                      Confirm
                    </Button>
                    <Button onClick={this.close} appearance="subtle">
                      Cancel
                    </Button>
                  </Modal.Footer>
                  {loading && (
                    <Loader
                      backdrop
                      center
                      size="md"
                      content={`Saving...`}
                      vertical
                    />
                  )}
                  {error && Alert.error("Failed. Please try again.")}
                </div>
              );
            }}
          </Mutation>
        </Modal>
        {isEdit ? (
          <IconButton
            appearance="subtle"
            onClick={this.open}
            icon={<Icon icon="edit2" />}
            className="staffList__btn"
          />
        ) : (
          <Button appearance="ghost" onClick={this.open}>
            New Item
          </Button>
        )}
      </div>
    );
  }
}

export default ItemFormModal;
