/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const reminderValidation = require('../../validations/reminder.validation');
const reminderController = require('../../controllers/reminder.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('personal'), validate(reminderValidation.createReminder), reminderController.createReminder)
  .get(auth('getUsers'), validate(reminderValidation.getReminders), reminderController.getReminders);


  router
  .route('/user/:userId/all')
  .get(auth('personal'),  reminderController.getAllAvailableReminderServiceByUserId);


  router
  .route('/user/:userId/latest')
  .get(auth('personal'),  reminderController.getLatestReminderServiceByUser);

  router
  .route('/user/:userId/notification')
  .get(auth('personal'),  reminderController.getRemindersNotificationByUser);

  

router
  .route('/user/:userId')
  .get(auth('personal'), validate(reminderValidation.getDriverReminderByUser), reminderController.getReminderServiceByUserId);
  router
  .route('/user/:userId/:type')
  .get(auth('personal'), validate(reminderValidation.getDriverReminderByUserAndType), reminderController.getReminderServiceByUserIdAndType);

  router
  .route('/user/:userId/family')
  .get(auth('personal'), validate(reminderValidation.getDriverReminderByUser), reminderController.getReminderServiceByUserIdAndFamily);


  

router
  .route('/:reminderId')
  .patch(auth('personal'), validate(reminderValidation.updateReminder), reminderController.updateReminder)
  .delete(auth('manageUsers'), validate(reminderValidation.deleteReminder), reminderController.deleteReminder);

module.exports = router;
