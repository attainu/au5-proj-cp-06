const router = require('express').Router();
const PostModel = require('../models/postSchema');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

router.post('/', async (req, res, next) => {
  const {
    body,
    userHandle,
    comments: { commentBody, commentHandle }
  } = req.body;
  try {
    if (body.trim === '') {
      return res.status(400).json({ body: 'Body must be empty' });
    }
    const newPost = new PostModel({
      body,
      userHandle,
      comments: {
        commentBody,
        commentHandle
      }
    });
    let response = await newPost.save();
    res.send(response);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
