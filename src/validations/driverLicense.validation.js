/* eslint-disable prettier/prettier */
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLicense = {
  body: Joi.object().keys({
    license_level: Joi.string().required(),
    license_years: Joi.number().required(),
    issue_date: Joi.date().max('now'),
    expiration_date: Joi.date().min('now'),
    userId: Joi.string().custom(objectId),
    organaization: Joi.string().custom(objectId),
    organaization_user: Joi.string().custom(objectId),


  }),
};

const getLicenses = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLicense = {
  params: Joi.object().keys({
    licenseId: Joi.string().custom(objectId),
  }),
};

const getDriverLicenseByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getDriverLicenseByOrg = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId),
  }),
};

const updateLicense = {
  params: Joi.object().keys({
    licenseId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      license_level: Joi.string(),
      license_years: Joi.number(),
      issue_date: Joi.date().max('now'),
      expiration_date: Joi.date(),
    })
    .min(1),
};

const deleteLicense = {
  params: Joi.object().keys({
    licenseId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLicense,
  getLicenses,
  getLicense,
  getDriverLicenseByUser,
  updateLicense,
  deleteLicense,
  getDriverLicenseByOrg
};
