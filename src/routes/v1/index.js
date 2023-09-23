const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const licenseRoute = require('./driverLicense.route');
const carRoute= require('./car.route')
const carSettingRoute= require('./carSetting.route')
const reminderRoute= require('./reminder.route')


const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/driver_license',
    route: licenseRoute,
  },
  {
    path: '/car',
    route: carRoute,
  },
  {
    path:'/car_setting',
    route:carSettingRoute
  },
  {
    path:'/reminder',
    route:reminderRoute
  }
  
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
