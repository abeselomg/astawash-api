/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const moment = require('moment');

const { Reminder,Car,DriverLicense } = require('../models');
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

  const getLatestReminderServiceByUser = async (userId) => {
    let allReminders={};
    allReminders["birthday"]=await Reminder.findOne({ user:userId,type:'birthday'},'date').sort({date:-1})
    allReminders["anniversary"]=await Reminder.findOne({ user:userId,type:'anniversary'},'date').sort({date:-1})
    allReminders["third_party_expiration_date"]=await Car.findOne({ user:userId},'third_party_expiration_date').sort({third_party_expiration_date:-1})
    allReminders["bolo_expiration_date"]=await Car.findOne({ user:userId},'bolo_expiration_date').sort({bolo_expiration_date:-1})
    allReminders["full_insurance_expiration_date"]=await Car.findOne({ user:userId},'full_insurance_expiration_date').sort({full_insurance_expiration_date:-1})
    allReminders["expiration_date"]=await DriverLicense.findOne({ user:userId},'expiration_date').sort({expiration_date:-1})

    return allReminders
  };


  const getRemindersNotificationByUser = async (userId) => {
    let allReminders={};
    let futureDate=moment().add(14,"days").format("YYYY-MM-DD")
    allReminders["birthday"]=await Reminder.find({ user:userId,type:'birthday',date:moment().format("YYYY-MM-DD")},['name','date','description']).sort({date:-1})
    allReminders["anniversary"]=await Reminder.find({ user:userId,type:'anniversary',date:moment().format("YYYY-MM-DD")},['name','date','description']).sort({date:-1})
    allReminders["third_party_expiration_date"]=await Car.find({ user:userId,third_party_expiration_date:futureDate},['third_party_expiration_date','plate_number','car_brand']).populate('car_brand')
    allReminders["bolo_expiration_date"]=await Car.find({ user:userId,bolo_expiration_date:futureDate},['bolo_expiration_date','plate_number','car_brand']).populate('car_brand')
    allReminders["full_insurance_expiration_date"]=await Car.find({ user:userId,full_insurance_expiration_date: futureDate},['full_insurance_expiration_date','plate_number','car_brand']).populate('car_brand')
    allReminders["expiration_date"]=await DriverLicense.find({ user:userId, expiration_date:futureDate},'expiration_date').sort({expiration_date:-1})

    return allReminders
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
  getReminderByUserAndFamily,
  getLatestReminderServiceByUser,getRemindersNotificationByUser
};
