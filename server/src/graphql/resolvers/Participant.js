const { users, events } = require('../../data.json');

const Participant = {
  user: (parent) => users.find((user) => user.id == parent.user_id),
  event: (parent) => events.find((event) => event.id == parent.event_id),
};

module.exports.Participant = Participant;
