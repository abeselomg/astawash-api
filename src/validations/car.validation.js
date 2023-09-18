/* eslint-disable prettier/prettier */
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCar = {
  body: Joi.object().keys({
    regionId: Joi.string().custom(objectId).required(),
    codeId: Joi.string().custom(objectId).required(),
    carBrandId: Joi.string().custom(objectId).required(),
    plate_number: Joi.string().required(),
    third_party_expiration_date: Joi.date().min('now'),
    bolo_expiration_date: Joi.date().min('now'),
    full_insurance_expiration_date: Joi.date().min('now'),
    car_cc: Joi.number().integer(),
    manufacturing_year: Joi.number().integer(),
    userId: Joi.string().required().custom(objectId),

  }),
};

const getCars = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCar = {
  params: Joi.object().keys({
    carId: Joi.string().custom(objectId),
  }),
};

const getCarByUser = {
    params: Joi.object().keys({
      userId: Joi.string().custom(objectId),
    }),
  };

const updateCar = {
  params: Joi.object().keys({
    carId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        plate_number: Joi.string(),
        third_party_expiration_date: Joi.date().min('now'),
        bolo_expiration_date: Joi.date().min('now'),
        full_insurance_expiration_date: Joi.date().min('now'),
        car_cc: Joi.number().integer(),
        manufacturing_year: Joi.number().integer(),
    })
    .min(1),
};

const deleteCar = {
  params: Joi.object().keys({
    carId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCar,
  getCars,
  getCar,
  getCarByUser,
  updateCar,
  deleteCar,
};
