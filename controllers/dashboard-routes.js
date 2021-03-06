const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log("GET Dashboard")
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "body", "user_id", "date_created"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("get dashboard",posts)
    res.render("all-posts-admin", {
      layout: 'dashboard',
      posts,
      loggedIn: req.session.loggedIn,
      username:req.session.username
    });
  } catch (err) {
    console.log(err,"Err - dashboard")
    res.redirect("login")
  }
})

router.get("/admin",(req,res) => {
    res.render('all-posts-admin',{
      layout:'dashboard',
      loggedIn:req.session.loggedIn,
      username:req.session.username
    });
  
});

router.get('/new',  (req, res) => {
  res.render("new-post", {
    layout: 'dashboard',
    loggedIn: req.session.loggedIn,
  });
});

router.get("/edit/:id", withAuth, async (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ["id", "title", "body", "user_id"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        console.log(post)
        res.render("edit-post", {
          post,
          loggedIn: req.session.loggedIn,
        });
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;