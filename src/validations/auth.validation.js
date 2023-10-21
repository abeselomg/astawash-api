const Joi = require('joi');
const { password, phoneNumber,objectId } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    phone: Joi.string().required().custom(phoneNumber),
    password: Joi.number().required().custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
    password: Joi.number().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    phone: Joi.string().required().custom(phoneNumber),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.number().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const setUpProfile = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    personal: {
      first_name: Joi.string().required(),
      middle_name: Joi.string().required(),
      last_name: Joi.string().required(),
      gender: Joi.string().required().valid('male', 'female'),
      date_of_birth: Joi.date().required(),
    },
    license_details: {
      issue_date: Joi.date().required(),
      expiration_date: Joi.date().required(),
      license_level: Joi.string().required(),
      license_years: Joi.number().required(),
    },
    car_registration: {
      regionId: Joi.string().required().custom(objectId),
      codeId: Joi.string().required().custom(objectId),
      plate_number: Joi.string().required(),
      third_party_expiration_date: Joi.date().required(),
      bolo_expiration_date: Joi.date().required(),
      full_insurance_expiration_date: Joi.date().required(),
      car_cc: Joi.number().required(),
      carBrandId: Joi.string().required().custom(objectId),
      manufacturing_year: Joi.number().required(),
    },
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  setUpProfile
};
