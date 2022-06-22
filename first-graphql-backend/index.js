const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { events, locations, users, participants } = require('./data.json');

const typeDefs = gql`
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

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: Float!
    lng: Float!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event!]!
  }

  type Participant {
    id: ID!
    user_id: ID!
    event_id: ID!
  }

  type Query {
    # Events
    events: [Event!]!
    event(id: ID!): Event!

    # Locations
    locations: [Location!]!
    location(id: ID!): Location!

    # Users
    users: [User!]!
    user(id: ID!): User!

    # Participants
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }
`;

const resolvers = {
  Query: {
    // Events
    events: () => events,
    event: (parent, args) => events.find((event) => event.id == args.id),

    // Locations
    locations: () => locations,
    location: (parent, args) => locations.find((location) => location.id == args.id),

    // Users
    users: () => users,
    user: (parent, args) => users.find((user) => user.id == args.id),

    // Participants
    participants: () => participants,
    participant: (parent, args) => participants.find((participant) => participant.id == args.id),
  },

  Event: {
    location: (parent) => locations.find((location) => location.id === parent.location_id),
    user: (parent) => users.find((user) => user.id === parent.user_id),
    participants: (parent) => participants.filter((participant) => participant.event_id === parent.id),
  },

  User: {
    events: (parent) => events.filter((event) => event.user_id === parent.id),
  },

  // Comment: {
  //   user: (parent) => users.find((user) => user.id === parent.user_id),
  //   post: (parent) => posts.find((post) => post.id === parent.post_id),
  // },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
