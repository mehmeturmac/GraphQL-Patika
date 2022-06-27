import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

export const GET_LOCATIONS = gql`
  query {
    locations {
      id
      name
    }
  }
`;

export const NEW_EVENT = gql`
  mutation createEvent($data: createEvent!) {
    createEvent(data: $data) {
      id
      title
    }
  }
`;
