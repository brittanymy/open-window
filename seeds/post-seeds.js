const { Post } = require("../models");

const postdata = [
  {
    title: "Donec posuere metus vitae ipsum.",
    body: "Lorem donec posuere metus vitae ipsum.",
    user_id: 1,
  },
  {
    title: "Morbi non quam nec dui luctus rutrum.",
    body: "Lorem donec posuere metus vitae ipsum.",
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;