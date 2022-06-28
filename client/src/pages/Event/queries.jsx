import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      desc
      date
      from
      to
      location {
        name
        desc
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

// Fragment
const participantsFragment = gql`
  fragment ParticipantsFragment on Participant {
    user {
      username
      email
    }
  }
`;

export const GET_PARTICIPANTS = gql`
  query ($id: ID!) {
    event(id: $id) {
      participants {
        ...ParticipantsFragment
      }
    }
  }
  ${participantsFragment}
`;

export const PARTICIPANTS_SUBS = gql`
  subscription participantCreated($id: ID) {
    participantCreated(event_id: $id) {
      ...ParticipantsFragment
    }
  }
  ${participantsFragment}
`;

export const NEW_PARTICIPANT = gql`
  mutation createParticipant($data: createParticipant!) {
    createParticipant(data: $data) {
      user_id
      event_id
    }
  }
`;
