

/* eslint-disable prettier/prettier */
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const carSettingsController = require('../../controllers/carSettings.controller');

const router = express.Router();

router
  .route('/car_region')
  .post(auth('personal'),  carSettingsController.createCarRegion)
  .get(auth('personal'), carSettingsController.getCarRegions);

  router
  .route('/car_brand')
  .post(auth('personal'),  carSettingsController.createCarBrand)
  .get(auth('personal'), carSettingsController.getCarBrands);

  router
  .route('/car_code')
  .post(auth('personal'),  carSettingsController.createCarCode)
  .get(auth('personal'), carSettingsController.getCarCodes);


module.exports = router;
