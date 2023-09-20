/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { DriverLicense } = require('../models');
const userServices = require('./user.service');
const LicenseLevelService = require('./licenseLevel.service');

const ApiError = require('../utils/ApiError');

/**
 * Create a driver_license
 * @param {Object} licenseBody
 * @returns {Promise<DriverLicense>}
 */
const createDriverLicense = async (licenseBody) => {
  const user = await userServices.getUserById(licenseBody.userId);
  const license_level = await LicenseLevelService.getLicenseLevelById(licenseBody.license_level);

  return DriverLicense.create({ ...licenseBody, user: user,license_level:license_level });
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
const queryAllDriverLicense = async (filter, options) => {
  const driverLicenses = await DriverLicense.paginate(filter, options);
  return driverLicenses;
};

/**
 * Get driver_licenses by id
 * @param {ObjectId} id
 * @returns {Promise<DriverLicense>}
 */
const getDriverLicenseById = async (id) => {
  return DriverLicense.findById(id);
};

/**
 * Get driver_licenses of user
 * @param {string} user
 * @returns {Promise<DriverLicense>}
 */
const getDriverLicenseByUser = async (userId) => {
  return DriverLicense.find({ user:userId }).populate('user');
};

/**
 * Update driver_licenses by id
 * @param {ObjectId} driverLicenseId
 * @param {Object} updateBody
 * @returns {Promise<DriverLicense>}
 */
const updateDriverLicenseById = async (driverLicenseId, updateBody) => {
  const driverLicense = await getDriverLicenseById(driverLicenseId);
  if (!driverLicense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver license id not found');
  }

  Object.assign(driverLicense, updateBody);
  await driverLicense.save();
  return driverLicense;
};

/**
 * Delete driverLicense by id
 * @param {ObjectId} driverLicenseId
 * @returns {Promise<DriverLicense>}
 */
const deleteDriverLicenseById = async (driverLicenseId) => {
  const driverLicense = await getDriverLicenseById(driverLicenseId);
  if (!driverLicense) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Driver License not found');
  }
  await driverLicense.remove();
  return driverLicense;
};

module.exports = {
  createDriverLicense,
  queryAllDriverLicense,
  getDriverLicenseById,
  getDriverLicenseByUser,
  updateDriverLicenseById,
  deleteDriverLicenseById,
};
