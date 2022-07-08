const router = require('express').Router()
const User = require('../models/User')
const Post = require('../models/Post')
const bcrypt = require('bcrypt')

//UPDATE api/users/:id
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }

    res.status(401).json('You can only update your own account')
  }
})

//DELETE: /api/users/:id
// if userId matches, do {
// 1. delete user and posts
// 2.
//}
// else 401
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User has been deleted...')
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(401).json('You can only delete your own account')
  }
})
// router.delete('/:id', async (req, res) => {
//   if (req.body.userId === req.params.id) {
//     try {
//       const user = await User.findById(req.params.id)
//       try {
//         await User.findByIdAndDelete(req.params.id)
//         await Post.deleteMany({ username: user.username })
//         res.status(200).json('User has been deleted...')
//       } catch (error) {
//         res.status(500).json(error)
//       }
//     } catch (error) {
//       res.status(404).json('User not found')
//     }
//   } else {
//     res.status(401).json('You can only delete your own account')
//   }
// })

//GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (error) {
    res.status(404).json('User not found')
  }
})

module.exports = router
