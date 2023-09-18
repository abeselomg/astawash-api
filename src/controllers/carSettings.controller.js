/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { CarRegionService, CarCodeService, CarBrandService } = require('../services');

const createCarRegion = catchAsync(async (req, res) => {
  const carRegion = await CarRegionService.createCarRegion(req.body);
  res.status(httpStatus.CREATED).send(carRegion);
});

const createCarCode = catchAsync(async (req, res) => {
    const carCode = await CarCodeService.createCarCode(req.body);
    res.status(httpStatus.CREATED).send(carCode);
  });

  const createCarBrand = catchAsync(async (req, res) => {
    const carBrand = await CarBrandService.createCarBrand(req.body);
    res.status(httpStatus.CREATED).send(carBrand);
  });

const getCarRegions = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await CarRegionService.queryAllCarRegion(filter, options);
  res.send(result);
});

const getCarCodes = catchAsync(async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await CarCodeService.queryAllCarCode(filter, options);
    res.send(result);
  });

  const getCarBrands = catchAsync(async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await CarBrandService.queryAllCarBrand(filter, options);
    res.send(result);
  });

module.exports = {
    createCarRegion,
    createCarCode,
    createCarBrand,
    getCarRegions,
    getCarCodes,
    getCarBrands
};