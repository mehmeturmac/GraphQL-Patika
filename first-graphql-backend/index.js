const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { events, locations, users, participants } = require('./data.json');
const { v4: uuidv4 } = require('uuid');

const typeDefs = gql`
  # Event
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
    location: Location!
    user: User!
    participants: [Participant!]!
  }

  input createEvent {
    title: String!
    desc: String!
    date: String!
    from: String!
    to: String!
    location_id: ID!
    user_id: ID!
  }

  input updateEvent {
    title: String
    desc: String
    date: String
    from: String
    to: String
    location_id: ID
    user_id: ID
  }

  # Location
  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input createLocation {
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  input updateLocation {
    name: String
    desc: String
    lat: Float
    lng: Float
  }

  # User
  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }

  input createUser {
    username: String!
    email: String!
  }

  input updateUser {
    username: String
    email: String
  }

  # Participant
  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
  }

  input createParticipant {
    user_id: ID!
    event_id: ID!
  }

  input updateParticipant {
    user_id: ID
    event_id: ID
  }

  type DeleteAllOutput {
    count: Int!
  }

  type Query {
    # Event
    events: [Event!]!
    event(id: ID!): Event!

    # Location
    locations: [Location!]!
    location(id: ID!): Location!

    # User
    users: [User!]!
    user(id: ID!): User!

    # Participant
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }

  type Mutation {
    # Event
    createEvent(data: createEvent!): Event!
    updateEvent(id: ID!, data: updateEvent!): Event!
    deleteEvent(id: ID!): Event!
    deleteAllEvents: DeleteAllOutput!

    # Location
    createLocation(data: createLocation!): Location!
    updateLocation(id: ID!, data: updateLocation!): Location!
    deleteLocation(id: ID!): Location!
    deleteAllLocations: DeleteAllOutput!

    # User
    createUser(data: createUser!): User!
    updateUser(id: ID!, data: updateUser!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAllOutput!

    # Participant
    createParticipant(data: createParticipant!): Participant!
    updateParticipant(id: ID!, data: updateParticipant!): Participant!
    deleteParticipant(id: ID!): Participant!
    deleteAllParticipants: DeleteAllOutput!
  }
`;

const resolvers = {
  Event: {
    location: (parent) => locations.find((location) => location.id === parent.location_id),
    user: (parent) => users.find((user) => user.id === parent.user_id),
    participants: (parent) => participants.filter((participant) => participant.event_id === parent.id),
  },

  User: {
    events: (parent) => events.filter((event) => event.user_id === parent.id),
  },

  Query: {
    // Event
    events: () => events,
    event: (parent, args) => events.find((event) => event.id == args.id),

    // Location
    locations: () => locations,
    location: (parent, args) => locations.find((location) => location.id == args.id),

    // User
    users: () => users,
    user: (parent, args) => users.find((user) => user.id == args.id),

    // Participant
    participants: () => participants,
    participant: (parent, args) => participants.find((participant) => participant.id == args.id),
  },

  Mutation: {
    // Event
    createEvent: (parent, { data }) => {
      const event = {
        id: uuidv4(),
        ...data,
      };
      events.push(event);
      return event;
    },

    updateEvent: (parent, { id, data }) => {
      const event_index = events.findIndex((event) => event.id == id);
      if (event_index === -1) {
        throw new Error('Event not found!');
      }
      const updated_event = (events[event_index] = {
        ...events[event_index],
        ...data,
      });
      return updated_event;
    },

    deleteEvent: (parent, { id }) => {
      const event_index = events.findIndex((event) => event.id == id);
      if (event_index === -1) {
        throw new Error('Event not found!');
      }
      const deleted_event = events[event_index];
      events.splice(event_index, 1);
      return deleted_event;
    },

    deleteAllEvents: () => {
      const length = events.length;
      events.splice(0, length);
      return { count: length };
    },

    // Location
    createLocation: (parent, { data }) => {
      const location = {
        id: uuidv4(),
        ...data,
      };
      locations.push(location);
      return location;
    },

    updateLocation: (parent, { id, data }) => {
      const location_index = locations.findIndex((location) => location.id == id);
      if (location_index === -1) {
        throw new Error('Location not found!');
      }
      const updated_location = (locations[location_index] = {
        ...locations[location_index],
        ...data,
      });
      return updated_location;
    },

    deleteLocation: (parent, { id }) => {
      const location_index = locations.findIndex((location) => location.id == id);
      if (location_index === -1) {
        throw new Error('Location not found!');
      }
      const deleted_location = locations[location_index];
      locations.splice(location_index, 1);
      return deleted_location;
    },

    deleteAllLocations: () => {
      const length = locations.length;
      locations.splice(0, length);
      return { count: length };
    },

    // User
    createUser: (parent, { data }) => {
      const user = {
        id: uuidv4(),
        ...data,
      };
      users.push(user);
      return user;
    },

    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id == id);
      if (user_index === -1) {
        throw new Error('User not found!');
      }
      const updated_user = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      return updated_user;
    },

    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id == id);
      if (user_index === -1) {
        throw new Error('User not found!');
      }
      const deleted_user = users[user_index];
      users.splice(user_index, 1);
      return deleted_user;
    },

    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);
      return { count: length };
    },

    // Participant
    createParticipant: (parent, { data }) => {
      const participant = {
        id: uuidv4(),
        ...data,
      };
      participants.push(participant);
      return participant;
    },

    updateParticipant: (parent, { id, data }) => {
      const participant_index = participants.findIndex((participant) => participant.id == id);
      if (participant_index === -1) {
        throw new Error('Participant not found!');
      }
      const updated_participant = (participants[participant_index] = {
        ...participants[participant_index],
        ...data,
      });
      return updated_participant;
    },

    deleteParticipant: (parent, { id }) => {
      const participant_index = participants.findIndex((participant) => participant.id == id);
      if (participant_index === -1) {
        throw new Error('Participant not found!');
      }
      const deleted_participant = participants[participant_index];
      participants.splice(participant_index, 1);
      return deleted_participant;
    },

    deleteAllParticipants: () => {
      const length = participants.length;
      participants.splice(0, length);
      return { count: length };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
