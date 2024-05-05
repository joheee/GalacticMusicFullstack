const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const shirts = require('./components/shirts/shirts-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  shirts(app);

  return app;
};
