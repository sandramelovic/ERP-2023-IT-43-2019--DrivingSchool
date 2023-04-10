"use strict";

var usersDB = {
  users: require('../model/users.json'),
  setUsers: function setUsers(data) {
    this.users = data;
  }
};
var jwt = require('jsonwebtoken');
require('dotenv').config();
var handleRefreshToken = function handleRefreshToken(req, res) {
  var cookies = req.cookies;
  if (!(cookies !== null && cookies !== void 0 && cookies.jwt)) return res.sendStatus(401);
  var refreshToken = cookies.jwt;
  var foundUser = usersDB.users.find(function (person) {
    return person.refreshToken === refreshToken;
  });
  if (!foundUser) return res.sendStatus(403); //Forbidden 
  // evaluate jwt 
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    var accessToken = jwt.sign({
      "username": decoded.username
    }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30s'
    });
    res.json({
      accessToken: accessToken
    });
  });
};
module.exports = {
  handleRefreshToken: handleRefreshToken
};