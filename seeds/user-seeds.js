const sequelize = require("../config/config");
const { User, Post } = require("../models");

const userdata = [
  {
    username: "chrisb2",
    password: "password123",
  },
  {
    username: "willow12",
    password: "password123",
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;