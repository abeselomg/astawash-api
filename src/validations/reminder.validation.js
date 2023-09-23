/* eslint-disable prettier/prettier */
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createReminder = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    date: Joi.date().min('now'),
    type: Joi.string().required(),
    userId: Joi.string().required().custom(objectId),
  }),
};

const getReminders = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getReminder = {
  params: Joi.object().keys({
    reminderId: Joi.string().custom(objectId),
  }),
};

const getDriverReminderByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getDriverReminderByUserAndType = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    type: Joi.string(),
  }),
};

const updateReminder = {
  params: Joi.object().keys({
    reminderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      date: Joi.date().min('now'),
      type: Joi.string(),
    })
    .min(1),
};

const deleteReminder = {
  params: Joi.object().keys({
    reminderId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createReminder,
  getReminders,
  getReminder,
  getDriverReminderByUser,
  updateReminder,
  deleteReminder,
  getDriverReminderByUserAndType
};
