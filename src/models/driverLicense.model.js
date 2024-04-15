/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const driverLicenseSchema = mongoose.Schema(
  {
    license_level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LicenseLevel',
      required: true,
    },
    issue_date: {
      type: Date,
      required: true,
    },
    expiration_date: {
      type: Date,
      required: true,
    },
    license_years: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    organaization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organaization',
      required: false,
      default: null,
    },
    organaization_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrganaizationUser',
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
driverLicenseSchema.plugin(toJSON);
driverLicenseSchema.plugin(paginate);

/**
 * @typedef DriverLicense
 */
const DriverLicense = mongoose.model('DriverLicense', driverLicenseSchema);

module.exports = DriverLicense;
