/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { organizationUserService } = require('../services');

const createOrganizationUser = catchAsync(async (req, res) => {
  const organizationUser = await organizationUserService.createOrgUser(req.body);
  res.status(httpStatus.CREATED).send(organizationUser);
});

const getOrganizationUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await organizationUserService.queryOrgUsers(req.params.orgId);
  res.send(result);
});

const updateOrganizationUsers = catchAsync(async (req, res) => {
  const organizationUser = await organizationUserService.updateOrgUserById(req.params.userId, req.body);
  res.send(organizationUser);
});

const deleteOrganizationUser = catchAsync(async (req, res) => {
  await organizationUserService.deleteOrgUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  createOrganizationUser,
  getOrganizationUsers,
  updateOrganizationUsers,
  deleteOrganizationUser
};
