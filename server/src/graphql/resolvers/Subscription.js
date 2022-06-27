const { withFilter } = require('graphql-subscriptions');
const { events, locations, users, participants } = require('../../data.json');

const Subscription = {
  // Event
  eventCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator('eventCreated'),
      (payload, variables) => {
        return variables.user_id ? payload.eventCreated.user_id === variables.user_id : true;
      }
    ),
  },
  eventUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('eventUpdated'),
  },
  eventDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('eventDeleted'),
  },
  eventCount: {
    subscribe: (_, __, { pubsub }) => {
      setTimeout(() => {
        pubsub.publish('eventCount', { eventCount: events.length });
      }, 100);
      return pubsub.asyncIterator('eventCount');
    },
  },

  // Location
  locationCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('locationCreated'),
  },
  locationUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('locationUpdated'),
  },
  locationDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('locationDeleted'),
  },
  locationCount: {
    subscribe: (_, __, { pubsub }) => {
      setTimeout(() => {
        pubsub.publish('locationCount', { locationCount: locations.length });
      }, 100);
      return pubsub.asyncIterator('locationCount');
    },
  },

  // User
  userCreated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userCreated'),
  },
  userUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userUpdated'),
  },
  userDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('userDeleted'),
  },
  userCount: {
    subscribe: (_, __, { pubsub }) => {
      setTimeout(() => {
        pubsub.publish('userCount', { userCount: users.length });
      }, 100);
      return pubsub.asyncIterator('userCount');
    },
  },

  // Participant
  participantCreated: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator('participantCreated'),
      (payload, variables) => {
        return variables.event_id ? payload.participantCreated.event_id === variables.event_id : true;
      }
    ),
  },
  participantUpdated: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('participantUpdated'),
  },
  participantDeleted: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('participantDeleted'),
  },
  participantCount: {
    subscribe: (_, __, { pubsub }) => {
      setTimeout(() => {
        pubsub.publish('participantCount', { participantCount: participants.length });
      }, 100);
      return pubsub.asyncIterator('participantCount');
    },
  },
};

module.exports.Subscription = Subscription;
