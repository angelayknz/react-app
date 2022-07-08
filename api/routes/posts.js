const router = require('express').Router()
const Post = require('../models/Post')

//POST api/posts/
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(200).json(savedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})

//UPDATE api/posts/:id
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    //user validation
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        )
        res.status(200).json(updatedPost)
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(401).json('You can only update your own posts')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//DELETE api/posts/:id
// if author === username, delete
// else 401 unauthorized
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username)
      try {
        await post.delete()
        res.status(200).json('Post has been deleted...')
      } catch (error) {
        res.status(500).json(error)
      }
    else {
      res.status(401).json('You can only delete your own posts')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET all posts
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let posts
    if (username) {
      posts = await Post.find({ username: username })
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      })
    } else {
      posts = await Post.find()
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
})

//GET sigle post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json
  }
})

module.exports = router
