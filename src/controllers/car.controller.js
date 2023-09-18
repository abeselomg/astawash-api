/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { CarService } = require('../services');

const createCar = catchAsync(async (req, res) => {
  const car = await CarService.createCar(req.body);
  res.status(httpStatus.CREATED).send(car);
});

const getCars= catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await CarService.queryAllCar(filter, options);
  res.send(result);
});

const getCarsByUserId = catchAsync(async (req, res) => {
  const cars = await CarService.getCarByUser(req.params.userId);
  if (!cars) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No Cars found under this user');
  }
  res.send(cars);
});

const updateCar = catchAsync(async (req, res) => {
  const car = await CarService.updateCarById(req.params.carId, req.body);
  res.send(car);
});

const deleteCar = catchAsync(async (req, res) => {
  await CarService.deleteCarById(req.params.carId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCar,
  getCars,
  getCarsByUserId,
  updateCar,
  deleteCar,
};
