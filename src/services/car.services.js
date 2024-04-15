/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { Car, DriverLicense } = require('../models');
const userServices = require('./user.service');
const carRegionServices = require('./carRegion.services');
const CarCodeService = require('./carCode.services');
const CarBrandService = require('./carBrand.services');

const ApiError = require('../utils/ApiError');
const OrganaizationUser = require('../models/organizationUser.model');

/**
 * Create a car
 * @param {Object} carBody
 * @returns {Promise<Car>}
 */
const createCar = async (carBody) => {
  console.log(carBody);
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
  return Car.find({ user: userId }).populate(['user', 'region', 'code', 'car_brand']);
};
const getCarByOrg = async (orgId) => {
  return Car.find({ organaization: orgId }).populate(['organaization', 'region', 'code', 'car_brand']);
};

/**
 * Update cars by id
 * @param {ObjectId} carId
 * @param {Object} updateBody
 * @returns {Promise<Car>}
 */
const updateCarById = async (carId, updateBody) => {
  const car = await getcarById(carId);
  if (!car) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car details not found');
  }
  let carRegion = car['region'];
  let carCode = car['code'];
  let carBrand = car['car_brand'];
  if (updateBody.regionId) {
    carRegion = await carRegionServices.getCarRegionById(updateBody.regionId);
  }

  if (updateBody.codeId) {
    carCode = await CarCodeService.getCarCodeById(updateBody.codeId);
  }

  if (updateBody.carBrandId) {
    carBrand = await CarBrandService.getCarBrandById(updateBody.carBrandId);
  }

  Object.assign(car, { ...updateBody, region: carRegion, code: carCode, car_brand: carBrand });
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

const getLatestReminderServiceByOrg = async (orgId) => {
  let allReminders = {};

  allReminders['third_party_expiration_date'] = await Car.findOne(
    { organaization: orgId },
    'third_party_expiration_date'
  ).sort({ third_party_expiration_date: -1 });
  // ['third_party_expiration_date'];

  allReminders['bolo_expiration_date'] = await Car.findOne({ organaization: orgId }, 'bolo_expiration_date').sort({
    bolo_expiration_date: -1,
  });
  allReminders['full_insurance_expiration_date'] = await Car.findOne(
    { organaization: orgId },
    'full_insurance_expiration_date'
  ).sort({ full_insurance_expiration_date: -1 });
  allReminders['license_expiration_date'] = await DriverLicense.findOne({ organaization: orgId }, 'expiration_date').sort({
    expiration_date: -1,
  });

  return allReminders;
};

const getDataCountByOrg = async (orgId) => {
  let allReminders = {};

  allReminders['cars'] = await Car.find({ organaization: orgId }).count();
  allReminders['licenses'] = await DriverLicense.find({ organaization: orgId }).count();
  allReminders['Drivers'] = await OrganaizationUser.find({ organaization: orgId }).count();

  return allReminders;
};

const getThisWeekByOrg = async (organizationId) => {
  let allReminders = {};
  const startOfWeek = new Date();
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date();
  endOfWeek.setHours(23, 59, 59, 999);
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

  console.log(startOfWeek, endOfWeek);
  allReminders['third_party'] = await Car.find({
    organaization: organizationId,
    third_party_expiration_date: {
      $gte: startOfWeek,
      $lte: endOfWeek,
    },
  }).populate(['car_brand', 'code', 'region']);
  allReminders['bolo_expiration'] = await Car.find({
    organaization: organizationId,
    bolo_expiration_date: {
      $gte: startOfWeek,
      $lte: endOfWeek,
    },
  }).populate(['car_brand', 'code', 'region']);

  allReminders['full_insurance'] = await Car.find({
    organaization: organizationId,
    full_insurance_expiration_date: {
      $gte: startOfWeek,
      $lte: endOfWeek,
    },
  }).populate(['car_brand', 'code', 'region']);
  return allReminders;
};

module.exports = {
  createCar,
  queryAllCar,
  getcarById,
  getCarByUser,
  updateCarById,
  deleteCarById,
  getCarByOrg,
  getLatestReminderServiceByOrg,
  getDataCountByOrg,
  getThisWeekByOrg,
};
