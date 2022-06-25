const { locations, users, participants } = require('../../data.json');

const Event = {
  location: (parent) => locations.find((location) => location.id === parent.location_id),
  user: (parent) => users.find((user) => user.id === parent.user_id),
  participants: (parent) => participants.filter((participant) => participant.event_id === parent.id),
};

module.exports.Event = Event;
