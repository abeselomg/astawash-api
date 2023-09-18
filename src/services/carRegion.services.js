/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { CarRegion } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a car
 * @param {Object} carRegion
 * @returns {Promise<Car>}
 */
const createCarRegion = async (carRegionBody) => {
  return CarRegion.create({ ...carRegionBody });
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
const queryAllCarRegion = async (filter, options) => {
  const carRegion = await CarRegion.paginate(filter, options);
  return carRegion;
};

/**
 * Get cars by id
 * @param {ObjectId} id
 * @returns {Promise<CarRegion>}
 */
const getCarRegionById = async (id) => {
  return CarRegion.findById(id);
};

module.exports = {
  createCarRegion,
  queryAllCarRegion,
  getCarRegionById,
};
