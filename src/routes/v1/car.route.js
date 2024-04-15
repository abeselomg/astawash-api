/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const carValidation = require('../../validations/car.validation');
const carController = require('../../controllers/car.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('personal'), validate(carValidation.createCar), carController.createCar)
  .get(auth('getUsers'), validate(carValidation.getCars), carController.getCars);

router.route('/org/:orgId').get(auth('personal'), validate(carValidation.getCarByOrg), carController.getCarsByOrgId);
router.route('/user/:userId').get(auth('personal'), validate(carValidation.getCarByUser), carController.getCarsByUserId);
router
  .route('/:carId')
  .patch(auth('personal'), validate(carValidation.updateCar), carController.updateCar)
  .delete(auth('manageUsers'), validate(carValidation.deleteCar), carController.deleteCar);

module.exports = router;
