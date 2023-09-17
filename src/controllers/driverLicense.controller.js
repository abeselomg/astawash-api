/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { driverLicenseService } = require('../services');

const createDriverLicense = catchAsync(async (req, res) => {
  const driverLicense = await driverLicenseService.createDriverLicense(req.body);
  res.status(httpStatus.CREATED).send(driverLicense);
});

const getDriverLicenses = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await driverLicenseService.queryAllDriverLicense(filter, options);
  res.send(result);
});

const getDriverLicenseByUserId = catchAsync(async (req, res) => {
  const driverLicense = await driverLicenseService.getDriverLicenseByUser(req.params.userId);
  if (!driverLicense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'License not found');
  }
  res.send(driverLicense);
});

const updateLicense = catchAsync(async (req, res) => {
  const driverLicense = await driverLicenseService.updateDriverLicenseById(req.params.licenseId, req.body);
  res.send(driverLicense);
});

const deleteLicense = catchAsync(async (req, res) => {
  await driverLicenseService.deleteDriverLicenseById(req.params.licenseId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDriverLicense,
  getDriverLicenses,
  getDriverLicenseByUserId,
  updateLicense,
  deleteLicense,
};
