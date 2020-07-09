import { gql } from "apollo-boost";
const dataTemplate = `
  id
  description_en
  description_cn
  popularity
  category
  fileKeys
`;

const variablesTemplate = `
  $description_en: String!
  $description_cn: String!
  $popularity: Int!
  $category: String!
  $fileKeys: String!
`;

const inputTemplate = `
  description_en: $description_en
  description_cn: $description_cn
  popularity: $popularity
  category: $category
  fileKeys: $fileKeys
`;

//-------------------------------------------------------------------
const schema_items_content =
  `
  query Items ($category: String! $orderBy: String $first: Int, $skip: Int){
    items(category: $category orderBy: $orderBy first: $first skip: $skip) {
      count
      items {` +
      dataTemplate +
      `}
    }
  }
`;
export const schema_items = gql`
  ${schema_items_content}
`;
//--------------------------------------------------------------------
const schema_createItem_content =
  `
  mutation CreateItem(` +
  variablesTemplate +
  `) {
    createItem(
      data: {` +
  inputTemplate +
  `}
    ){` +
  dataTemplate +
  `}
  }
`;
export const schema_createItem = gql`
  ${schema_createItem_content}
`;
//----------------------------------------------------------------------
const schema_updateItem_content =
  `
  mutation UpdateItem(
    $id: ID!` +
  variablesTemplate +
  `) {
    updateItem(
      id: $id
      data: {` +
  inputTemplate +
  `}
    ) {` +
  dataTemplate +
  `}
  }
`;
export const schema_updateItem = gql`
  ${schema_updateItem_content}
`;
//----------------------------------------------------------------------
const schema_deleteItem_content =
  `
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {` +
  dataTemplate +
  `}
  }
`;
export const schema_deleteItem = gql`
  ${schema_deleteItem_content}
`;
