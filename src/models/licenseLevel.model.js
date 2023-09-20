/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const licenseLevelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
licenseLevelSchema.plugin(toJSON);
licenseLevelSchema.plugin(paginate);


/**
 * @typedef LicenseLevel
 */
const LicenseLevel = mongoose.model('LicenseLevel', licenseLevelSchema);

module.exports = LicenseLevel;
