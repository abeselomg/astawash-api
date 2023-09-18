/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { Car } = require('../models');
const userServices = require('./user.service');
const carRegionServices = require('./carRegion.services');
const CarCodeService = require('./carCode.services');
const CarBrandService = require('./carBrand.services');

const ApiError = require('../utils/ApiError');

/**
 * Create a car
 * @param {Object} carBody
 * @returns {Promise<Car>}
 */
const createCar = async (carBody) => {
  const user = await userServices.getUserById(carBody.userId);
  const carRegion = await carRegionServices.getCarRegionById(carBody.regionId);
  const carCode = await CarCodeService.getCarCodeById(carBody.codeId);
  const carBrand = await CarBrandService.getCarBrandById(carBody.carBrandId);

  return Car.create({ ...carBody, user: user, region: carRegion, code: carCode, car_brand: carBrand });
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
const queryAllCar = async (filter, options) => {
  const cars = await Car.paginate(filter, options);
  return cars;
};

/**
 * Get cars by id
 * @param {ObjectId} id
 * @returns {Promise<Car>}
 */
const getcarById = async (id) => {
  return Car.findById(id);
};

/**
 * Get cars of user
 * @param {string} user
 * @returns {Promise<Car>}
 */
const getCarByUser = async (userId) => {
  return Car.find({ user: userId }).populate(['user','region','code','car_brand']);
};
 
/**
 * Update cars by id
 * @param {ObjectId} carId
 * @param {Object} updateBody
 * @returns {Promise<Car>}
 */
const updateCarById = async (carId, updateBody) => {
  const car = await getcarById(driverLicenseId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car details not found');
  }

  Object.assign(car, updateBody);
  await car.save();
  return car;
};

/**
 * Delete car by id
 * @param {ObjectId} carId
 * @returns {Promise<Car>}
 */
const deleteCarById = async (carId) => {
  const car = await getcarById(carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found');
  }
  await car.remove();
  return car;
};

module.exports = {
  createCar,
  queryAllCar,
  getcarById,
  getCarByUser,
  updateCarById,
  deleteCarById,
};
