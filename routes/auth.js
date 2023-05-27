const router = require('express').Router()
const User = require('../model/user')
const auth = require('./verify')
const {
  registerValidation,
  loginValidation,
} = require('../validation/validation')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body)
  //res.send(error.details[0].message)
  if (error) return res.status(400).send(error.details[0].message)

  const emailExists = await User.findOne({ email: req.body.email })
  if (emailExists) {
    return res.status(400).send('Email already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  })

  try {
    await user.save()
    res.status(200).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Email not Found')
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) {
    return res.status(400).send('Invalid Password')
  }
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
})

module.exports = router
