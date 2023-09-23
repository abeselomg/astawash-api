/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { reminderService } = require('../services');

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
};
