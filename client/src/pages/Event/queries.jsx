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
  subscription participantCreated($event_id: ID) {
    participantCreated(event_id: $event_id) {
      ...ParticipantsFragment
    }
  }
  ${participantsFragment}
`;
