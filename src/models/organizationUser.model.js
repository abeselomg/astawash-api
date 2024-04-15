/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const emailValidator = require('../utils/validateEmail');
const bcrypt = require('bcryptjs');
const DriverLicense =require('./driverLicense.model')

const organaizationUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    organaization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organaization',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
organaizationUserSchema.plugin(toJSON);
organaizationUserSchema.plugin(paginate);

organaizationUserSchema.pre('remove', function(next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  DriverLicense.remove({organaization_user: this._id}).exec();
  next();
});


/**
 * @typedef OrganaizationUser
 */
const OrganaizationUser = mongoose.model('OrganaizationUser', organaizationUserSchema);

module.exports = OrganaizationUser;
