/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const licenceValidation = require('../../validations/driverLicense.validation');
const licenseController = require('../../controllers/driverLicense.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('personal'), validate(licenceValidation.createLicense), licenseController.createDriverLicense)
  .get(auth('getUsers'), validate(licenceValidation.getLicenses), licenseController.getDriverLicenses);

router
  .route('/user/:userId')
  .get(auth('personal'), validate(licenceValidation.getDriverLicenseByUser), licenseController.getDriverLicenseByUserId);
router
  .route('/:licenseId')
  .patch(auth('personal'), validate(licenceValidation.updateLicense), licenseController.updateLicense)
  .delete(auth('manageUsers'), validate(licenceValidation.deleteLicense), licenseController.deleteLicense);

module.exports = router;
