/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { CarBrand } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a car
 * @param {Object} carBrandBody
 * @returns {Promise<CarBrand>}
 */
const createCarBrand = async (carBrandBody) => {
  return CarBrand.create({ ...carBrandBody });
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
const queryAllCarBrand = async (filter, options) => {
  const carCode = await CarBrand.paginate(filter, options);
  return carCode;
};

/**
 * Get cars by id
 * @param {ObjectId} id
 * @returns {Promise<CarBrand>}
 */
const getCarBrandById = async (id) => {
  return CarBrand.findById(id);
};

module.exports = {
  createCarBrand,
  queryAllCarBrand,
  getCarBrandById,
};
