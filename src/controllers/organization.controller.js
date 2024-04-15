/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { organizationService, CarService } = require('../services');
const { getLatestReminderServiceByOrg, getDataCountByOrg, getThisWeekByOrg } = require('../services/car.services');

const createOrganization = catchAsync(async (req, res) => {
  const organization = await organizationService.createOrganization(req.body);
  res.status(httpStatus.CREATED).send(organization);
});

const getOrganizations = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await organizationService.queryAllOrganization(filter, options);
  res.send(result);
});
const getSingleOrganization = catchAsync(async (req, res) => {
  const result = await organizationService.getOrganizationById(req.params.orgId);
  res.send(result);
});


const updateOrganizations = catchAsync(async (req, res) => {
  const organization = await organizationService.updateOrganizationById(req.params.orgId, req.body);
  res.send(organization);
});

const deleteOrganization = catchAsync(async (req, res) => {
  await organizationService.deleteOrganizationById(req.params.orgId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getOrganizationDashboard = catchAsync(async (req, res) => {
  let reminder = await getLatestReminderServiceByOrg(req.params.orgId);
  let count = await getDataCountByOrg(req.params.orgId);
  let thisweek = await getThisWeekByOrg(req.params.orgId);

  res.send({ reminder: reminder, count: count, thisweek: thisweek });
});

module.exports = {
  createOrganization,
  getOrganizations,
  updateOrganizations,
  deleteOrganization,
  getOrganizationDashboard,
  getSingleOrganization
};

