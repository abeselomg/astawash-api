/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { CarCode } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a car
 * @param {Object} carCodeBody
 * @returns {Promise<CarCode>}
 */
const createCarCode = async (carCodeBody) => {
  return CarCode.create({ ...carCodeBody });
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
const queryAllCarCode = async (filter, options) => {
  const carCode = await CarCode.paginate(filter, options);
  return carCode;
};

/**
 * Get cars by id
 * @param {ObjectId} id
 * @returns {Promise<CarCode>}
 */
const getCarCodeById = async (id) => {
  return CarCode.findById(id);
};
const deleteCarCodeById = async (id) => {
  const carCode = await getCarCodeById(id);
  if (!carCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'carCode not found');
  }
  await carCode.remove();
  return carCode;
};
module.exports = {
  createCarCode,
  queryAllCarCode,
  getCarCodeById,
  deleteCarCodeById
};
