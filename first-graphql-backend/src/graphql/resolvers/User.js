const { events } = require('../../data.json');

const User = {
  events: (parent) => events.filter((event) => event.user_id === parent.id),
};

module.exports.User = User;
