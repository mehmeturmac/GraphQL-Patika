const { events, locations, users, participants } = require('../../data.json');

const Query = {
  // Event
  events: () => events,
  event: (_, args) => events.find((event) => event.id == args.id),

  // Location
  locations: () => locations,
  location: (_, args) => locations.find((location) => location.id == args.id),

  // User
  users: () => users,
  user: (_, args) => users.find((user) => user.id == args.id),

  // Participant
  participants: () => participants,
  participant: (_, args) => participants.find((participant) => participant.id == args.id),
};

module.exports.Query = Query;
