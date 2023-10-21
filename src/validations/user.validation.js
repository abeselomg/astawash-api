const Joi = require('joi');
const { password, objectId, phoneNumber } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    phone: Joi.string().required().custom(phoneNumber),
    password: Joi.number().required().custom(password),
    first_name: Joi.string().required(),
    middle_name: Joi.string().required(),
    last_name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    first_name: Joi.string(),
    middle_name: Joi.string(),
    last_name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      phone: Joi.string().custom(phoneNumber),
      password: Joi.number().custom(password),
      first_name: Joi.string(),
      middle_name: Joi.string(),
      last_name: Joi.string(),
      gender: Joi.string().valid('male', 'female'),
      date_of_birth: Joi.date().max('now'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
