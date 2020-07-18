import React from "react";
import axios from "axios";
import _ from "lodash";
import { Mutation } from "@apollo/react-components";
import serverUrl from "../../serverUrl";
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
        URLs: "",
      },
      formError: {},
      show: false,
      doSubmit: false,
      id: "",
      uploadFiles: [],
      removeFiles: [],
    };
    this.state = Object.assign({}, this.initialState);
  }
  //modal function
  close = () => {
    //if do not submit, reserve last version of images
    if (!this.state.doSubmit) {
      const prevFiles = this.state.formValue.URLs
        ? this.state.formValue.URLs.split(",").map((item) => item.split("/").pop())
        : [];
      const uploadFiles = this.state.uploadFiles.map((item) => item.name);
      const removeFiles = _.difference(uploadFiles, prevFiles);
      if (removeFiles.length !== 0) {
        for (let i = 0; i < removeFiles.length; i++) {
          axios.delete(
            `${process.env.REACT_APP_SERVER_ENDPOINT}/checkout/delete/${this.props.category}/${removeFiles[i]}`
          );
        }
      }
    }
    //re-initial formValue
    this.setState(this.initialState);
  };
  open = () => {
    this.setState({ show: true });
    //edit data, import data to fromValue
    if (this.props.isEdit) {
      const { data, imgURLs } = this.props;
      this.setState({
        id: data.id,
        formValue: data,
        uploadFiles: imgURLs.map((item, index) => ({
          name: item.split("/").pop(),
          fileKey: index.toString(),
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
      const { id, formValue, uploadFiles, removeFiles } = this.state;
      //transform files url from array to string
      const data = {
        ...formValue,
        URLs: uploadFiles.map((item) => item.url).join(","),
      };
      //if edit data, insert its original id
      const variables = this.props.isEdit
        ? {
            ...data,
            id,
          }
        : data;
      mutate({
        variables,
        refetchQueries: [
          {
            query: schema_items,
            variables: this.props.variables,
          },
        ],
      });
      //execute to remove files
      if (removeFiles.length !== 0) {
        for (let i = 0; i < removeFiles.length; i++) {
          axios.delete(
            `${process.env.REACT_APP_SERVER_ENDPOINT}/checkout/delete/${this.props.category}/${removeFiles[i].name}`
          );
        }
      }
    }
  };
  handleMutationComplete = () => {
    this.setState({
      doSubmit: true,
    });
    this.close();
    Alert.success("Success.");
  };
  handleRemove = (value) => {
    //on hold remove files
    const removeFile = this.state.uploadFiles.find(
      (item) => item.fileKey === value.fileKey
    );
    //update uploadFiles and on hold removeFiles
    this.setState((prevState) => ({
      uploadFiles: prevState.uploadFiles.filter(
        (item) => value.fileKey !== item.fileKey
      ),
      removeFiles: [...prevState.removeFiles, removeFile],
    }));
  };

  handleSuccess = (res, file) => {
    //return image url from aws s3 bucket
    this.setState((prevState) => ({
      uploadFiles: [
        ...prevState.uploadFiles,
        {
          name: res.Location.split("/").pop(),
          fileKey: file.fileKey,
          url: res.Location,
        },
      ],
    }));
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
                          action={`${process.env.REACT_APP_SERVER_ENDPOINT}/checkout/${category}`}
                          encType="multipart/form-data"
                          name="checkout"
                          onRemove={this.handleRemove}
                          onSuccess={this.handleSuccess}
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
