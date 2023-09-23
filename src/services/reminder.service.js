/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { Reminder } = require('../models');
const userServices = require('./user.service');

const ApiError = require('../utils/ApiError');

/**
 * Create a reminder
 * @param {Object} reminderBody
 * @returns {Promise<Reminder>}
 */
const createReminder = async (reminderBody) => {
  const user = await userServices.getUserById(reminderBody.userId);
  return Reminder.create({ ...reminderBody, user: user});
};

/**
 * Query for driver_licenses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAllReminders = async (filter, options) => {
  const reminder = await Reminder.paginate(filter, options);
  return reminder;
};

/**
 * Get driver_licenses by id
 * @param {ObjectId} id
 * @returns {Promise<Reminder>}
 */
const getReminderById = async (id) => {
  return Reminder.findById(id);
};

/**
 * Get driver_licenses of user
 * @param {string} user
 * @returns {Promise<Reminder>}
 */
const getReminderByUser = async (userId) => {
  return Reminder.find({ user:userId }).populate('user');
};


const getReminderByUserAndType = async (userId,type) => {
    return Reminder.find({ user:userId ,type:type}).populate('user');
  };


  const getReminderByUserAndFamily = async (userId) => {
    console.log('hereeeeee')
    return Reminder.find({ user:userId , type:'birthday'||'anniversary'}).populate('user');
// find({ user:userId ,type:{ $in: ['birthday', 'anniversary'] }}).populate('user');

  };

/**
 * Update driver_licenses by id
 * @param {ObjectId} reminderId
 * @param {Object} updateBody
 * @returns {Promise<Reminder>}
 */
const updateReminderById = async (reminderId, updateBody) => {
  const reminder = await getReminderById(reminderId);
  if (!reminder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reminder id not found');
  }


  Object.assign(reminder, updateBody);
  await reminder.save();
  return reminder;
};

/**
 * Delete driverLicense by id
 * @param {ObjectId} reminderId
 * @returns {Promise<Reminder>}
 */
const deleteReminderById = async (reminderId) => {
  const reminder = await getReminderById(reminderId);
  if (!reminder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver License not found');
  }
  await reminder.remove();
  return reminder;
};

module.exports = {
  createReminder,
  queryAllReminders,
  getReminderById,
  getReminderByUser,
  updateReminderById,
  deleteReminderById,
  getReminderByUserAndType,
  getReminderByUserAndFamily
};
