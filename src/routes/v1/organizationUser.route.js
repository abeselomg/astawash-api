/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const organizationController = require('../../controllers/organizationUser.controller');

const router = express.Router();

router.route('/').post(auth('personal'), organizationController.createOrganizationUser);

router.route('/:orgId').get(auth('getUsers'), organizationController.getOrganizationUsers);

router
  .route('/:userId')
  .patch(auth('personal'), organizationController.updateOrganizationUsers)
  .delete(auth('manageUsers'), organizationController.deleteOrganizationUser);

module.exports = router;
