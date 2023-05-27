const router = require('express').Router()
const verify = require('./verify')
const User = require('../model/user')

router.get('/', verify, (req, res) => {
  res.send(req.user)
  const user = User.findOne({ _id: req.user })

  /*
  res.json({
    posts: {
      title: 'Test',
      description: 'Test Desc',
    },
  })
  */
})

module.exports = router
