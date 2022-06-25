const { v4: uuidv4 } = require('uuid');
const { events, locations, users, participants } = require('../../data.json');

const Mutation = {
  // Event
  createEvent: (_, { data }, { pubsub }) => {
    const event = {
      id: uuidv4(),
      ...data,
    };
    events.push(event);
    pubsub.publish('eventCreated', { eventCreated: event });
    pubsub.publish('eventCount', { eventCount: events.length });
    return event;
  },
  updateEvent: (_, { id, data }, { pubsub }) => {
    const event_index = events.findIndex((event) => event.id == id);
    if (event_index === -1) {
      throw new Error('Event not found!');
    }
    const updated_event = (events[event_index] = {
      ...events[event_index],
      ...data,
    });
    pubsub.publish('eventUpdated', { eventUpdated: updated_event });
    return updated_event;
  },
  deleteEvent: (_, { id }, { pubsub }) => {
    const event_index = events.findIndex((event) => event.id == id);
    if (event_index === -1) {
      throw new Error('Event not found!');
    }
    const deleted_event = events[event_index];
    events.splice(event_index, 1);
    pubsub.publish('eventDeleted', { eventDeleted: deleted_event });
    pubsub.publish('eventCount', { eventCount: events.length });
    return deleted_event;
  },
  deleteAllEvents: () => {
    const length = events.length;
    events.splice(0, length);
    pubsub.publish('eventCount', { eventCount: events.length });
    return { count: length };
  },

  // Location
  createLocation: (_, { data }, { pubsub }) => {
    const location = {
      id: uuidv4(),
      ...data,
    };
    locations.push(location);
    pubsub.publish('locationCreated', { locationCreated: location });
    pubsub.publish('locationCount', { locationCount: locations.length });
    return location;
  },
  updateLocation: (_, { id, data }, { pubsub }) => {
    const location_index = locations.findIndex((location) => location.id == id);
    if (location_index === -1) {
      throw new Error('Location not found!');
    }
    const updated_location = (locations[location_index] = {
      ...locations[location_index],
      ...data,
    });
    pubsub.publish('locationUpdated', { locationUpdated: updated_location });
    return updated_location;
  },
  deleteLocation: (_, { id }, { pubsub }) => {
    const location_index = locations.findIndex((location) => location.id == id);
    if (location_index === -1) {
      throw new Error('Location not found!');
    }
    const deleted_location = locations[location_index];
    locations.splice(location_index, 1);
    pubsub.publish('locationDeleted', { locationDeleted: deleted_location });
    pubsub.publish('locationCount', { locationCount: locations.length });
    return deleted_location;
  },
  deleteAllLocations: () => {
    const length = locations.length;
    locations.splice(0, length);
    pubsub.publish('locationCount', { locationCount: locations.length });
    return { count: length };
  },

  // User
  createUser: (_, { data }, { pubsub }) => {
    const user = {
      id: uuidv4(),
      ...data,
    };
    users.push(user);
    pubsub.publish('userCreated', { userCreated: user });
    pubsub.publish('userCount', { userCount: users.length });
    return user;
  },
  updateUser: (_, { id, data }, { pubsub }) => {
    const user_index = users.findIndex((user) => user.id == id);
    if (user_index === -1) {
      throw new Error('User not found!');
    }
    const updated_user = (users[user_index] = {
      ...users[user_index],
      ...data,
    });
    pubsub.publish('userUpdated', { userUpdated: updated_user });
    return updated_user;
  },
  deleteUser: (_, { id }, { pubsub }) => {
    const user_index = users.findIndex((user) => user.id == id);
    if (user_index === -1) {
      throw new Error('User not found!');
    }
    const deleted_user = users[user_index];
    users.splice(user_index, 1);
    pubsub.publish('userDeleted', { userDeleted: deleted_user });
    pubsub.publish('userCount', { userCount: users.length });
    return deleted_user;
  },
  deleteAllUsers: () => {
    const length = users.length;
    users.splice(0, length);
    pubsub.publish('userCount', { userCount: users.length });
    return { count: length };
  },

  // Participant
  createParticipant: (_, { data }, { pubsub }) => {
    const participant = {
      id: uuidv4(),
      ...data,
    };
    participants.push(participant);
    pubsub.publish('participantCreated', { participantCreated: participant });
    pubsub.publish('participantCount', { participantCount: participants.length });
    return participant;
  },
  updateParticipant: (_, { id, data }, { pubsub }) => {
    const participant_index = participants.findIndex((participant) => participant.id == id);
    if (participant_index === -1) {
      throw new Error('Participant not found!');
    }
    const updated_participant = (participants[participant_index] = {
      ...participants[participant_index],
      ...data,
    });
    pubsub.publish('participantUpdated', { participantUpdated: updated_participant });
    return updated_participant;
  },
  deleteParticipant: (_, { id }, { pubsub }) => {
    const participant_index = participants.findIndex((participant) => participant.id == id);
    if (participant_index === -1) {
      throw new Error('Participant not found!');
    }
    const deleted_participant = participants[participant_index];
    participants.splice(participant_index, 1);
    pubsub.publish('participantDeleted', { participantDeleted: deleted_participant });
    pubsub.publish('participantCount', { participantCount: participants.length });
    return deleted_participant;
  },
  deleteAllParticipants: () => {
    const length = participants.length;
    participants.splice(0, length);
    pubsub.publish('participantCount', { participantCount: participants.length });
    return { count: length };
  },
};

module.exports.Mutation = Mutation;
