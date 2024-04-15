/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const organaizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profile_pic: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
organaizationSchema.plugin(toJSON);
organaizationSchema.plugin(paginate);

/**
 * @typedef Organaization
 */
const Organaization = mongoose.model('Organaization', organaizationSchema);

module.exports = Organaization;
