/* eslint-disable prettier/prettier */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { Organization } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an organization
 * @param {Object} organizationBody
 * @returns {Promise<Organization>}
 */
const createOrganization = async (organizationBody) => {
  return Organization.create({ ...organizationBody });
};

/**
 * Query for Organization
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAllOrganization = async (filter, options) => {
  const organizations = await Organization.paginate(filter, options);
  return organizations;
};

/**
 * Get organization by id
 * @param {ObjectId} id
 * @returns {Promise<Organization>}
 */
const getOrganizationById = async (id) => {
  return Organization.findById(id);
};

const updateOrganizationById = async (organizationId, updateBody) => {
  const organization = await getOrganizationById(organizationId);
  if (!organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization id not found');
  }

  Object.assign(organization, updateBody);
  await organization.save();
  return organization;
};
const deleteOrganizationById = async (id) => {
  const single_organization = await getOrganizationById(id);
  if (!single_organization) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
  }
  await single_organization.remove();
  return single_organization;
};
module.exports = {
  createOrganization,
  queryAllOrganization,
  getOrganizationById,
  updateOrganizationById,
  deleteOrganizationById,
};
