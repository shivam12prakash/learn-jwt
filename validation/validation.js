//VALIDATION
const joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')

const registerValidation = (data) => {
  const schema = {
    name: joi.string().min(6).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(4).required(),
  }
  return joi.validate(data, schema)
}

const loginValidation = (data) => {
  const schema = {
    email: joi.string().min(6).required().email(),
    password: joi.string().min(4).required(),
  }
  return joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
