/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const organizationValidation = require('../../validations/organization.validation');
const organizationController = require('../../controllers/organization.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('personal'), validate(organizationValidation.createOrganization), organizationController.createOrganization)
  .get(auth('getUsers'), validate(organizationValidation.getOrganizations), organizationController.getOrganizations);

router.route('/dashboard/:orgId').get(
  auth('personal'),
  // validate(organizationValidation.updateOrganization),
  organizationController.getOrganizationDashboard
);
router
  .route('/:orgId')
  .get(auth('getUsers'), validate(organizationValidation.getOrganization), organizationController.getSingleOrganization)
  .patch(auth('personal'), validate(organizationValidation.updateOrganization), organizationController.updateOrganizations)
  .delete(
    auth('manageUsers'),
    validate(organizationValidation.deleteOrganization),
    organizationController.deleteOrganization
  );

module.exports = router;
