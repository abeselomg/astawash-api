/* eslint-disable prettier/prettier */
const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrganization = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    profile_pic: Joi.string(),
    description: Joi.string().allow(null).allow(''),
  }),
};

const getOrganizations = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getOrganization = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId),
  }),
};

const updateOrganization = {
  params: Joi.object().keys({
    orgId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      profile_pic: Joi.string(),
      description: Joi.string().allow(null).allow(''),
    })
    .min(1),
};

const deleteOrganization = {
  params: Joi.object().keys({
    orgId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization,
};
