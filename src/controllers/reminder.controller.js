/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reminderService,driverLicenseService,CarService } = require('../services');

const createReminder = catchAsync(async (req, res) => {
  const reminder = await reminderService.createReminder(req.body);
  res.status(httpStatus.CREATED).send(reminder);
});

const getReminders = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await reminderService.queryAllReminders(filter, options);
  res.send(result);
});

const getAllAvailableReminderServiceByUserId = catchAsync(async (req, res) => {
  const reminder = await reminderService.getReminderByUser(req.params.userId);
  const license= await driverLicenseService.getDriverLicenseByUser(req.params.userId);
  const cars= await CarService.getCarByUser(req.params.userId);

  let reminderMapped=[...reminder].map((e)=>{
    return {
      "name":e.name,
      "type":e.type,
      "date":e.date
    }
  })

  let licenseMapped=[...license].map((e)=>{
    return {
      "name":e.license_level.name,
      "type":'Driver Licence',
      "date":e.expiration_date
    }
  })

  let carMapped=[...cars].map((e)=>{
    return {
      "name":e.car_brand.name + " " + e.plate_number,
      "type":'Car Reminder',
      "date":e.third_party_expiration_date
    }
  })


  res.send([...reminderMapped,...licenseMapped,...carMapped]);
});



const getReminderServiceByUserId = catchAsync(async (req, res) => {
  const reminder = await reminderService.getReminderByUser(req.params.userId);
  if (!reminder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reminder not found');
  }
  res.send(reminder);
});

const getReminderServiceByUserIdAndType = catchAsync(async (req, res) => {
  const reminder = await reminderService.getReminderByUserAndType(req.params.userId, req.params.type);
  if (!reminder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reminder not found');
  }
  res.send(reminder);
});


const getReminderServiceByUserIdAndFamily = catchAsync(async (req, res) => {

  const reminder = await reminderService.getReminderByUserAndFamily(req.params.userId);
  if (!reminder) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Reminder not found');
  }
  res.send(reminder);
});




const updateReminder = catchAsync(async (req, res) => {
  const reminder = await reminderService.updateReminderById(req.params.reminderId, req.body);
  res.send(reminder);
});

const deleteReminder = catchAsync(async (req, res) => {
  await reminderService.deleteReminderById(req.params.reminderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createReminder,
  getReminders,
  getReminderServiceByUserId,
  updateReminder,
  deleteReminder,
  getReminderServiceByUserIdAndType,
  getReminderServiceByUserIdAndFamily,
  getAllAvailableReminderServiceByUserId
};
