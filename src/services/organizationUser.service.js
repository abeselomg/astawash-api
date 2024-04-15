const httpStatus = require('http-status');
const { OrganaizationUser } = require('../models');
const organizationService = require('./organization.service');
const ApiError = require('../utils/ApiError');

/**
 * Create a OrganaizationUser
 * @param {Object} userBody
 * @returns {Promise<OrganaizationUser>}
 */
const createOrgUser = async (userBody) => {
  const org = await organizationService.getOrganizationById(userBody.organaization);
  return OrganaizationUser.create({
    ...userBody,
    organization: org,
  });
};
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 *
 **/
const queryOrgUsers = async (orgId) => {
  const users = await OrganaizationUser.find({ organaization: orgId }).populate(['organaization']);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<OrganaizationUser>}
 */
const getOrgUserById = async (id) => {
  return OrganaizationUser.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<OrganaizationUser>}
 */

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<OrganaizationUser>}
 */
const updateOrgUserById = async (userId, updateBody) => {
  const user = await getOrgUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<OrganaizationUser>}
 */
const deleteOrgUserById = async (userId) => {
  const user = await getOrgUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createOrgUser,
  queryOrgUsers,
  getOrgUserById,
  updateOrgUserById,
  deleteOrgUserById,
};
