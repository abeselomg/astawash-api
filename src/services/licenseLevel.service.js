// LicenseLevel

/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { LicenseLevel } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a car
 * @param {Object} licenseLevelBody
 * @returns {Promise<LicenseLevel>}
 */
const createLicenseLevel = async (licenseLevelBody) => {
  return LicenseLevel.create({ ...licenseLevelBody });
};

/**
 * Query for car
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAllLicenseLevel = async (filter, options) => {
  const licenseLevel = await LicenseLevel.paginate(filter, options);
  return licenseLevel;
};

/**
 * Get cars by id
 * @param {ObjectId} id
 * @returns {Promise<LicenseLevel>}
 */
const getLicenseLevelById = async (id) => {
  return LicenseLevel.findById(id);
};

module.exports = {
  createLicenseLevel,
  queryAllLicenseLevel,
  getLicenseLevelById,
};
