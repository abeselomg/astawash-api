/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const carRegionSchema = mongoose.Schema(
  {
    region: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
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
carRegionSchema.plugin(toJSON);
carRegionSchema.plugin(paginate);


/**
 * @typedef CarRegion
 */
const CarRegion = mongoose.model('CarRegion', carRegionSchema);

module.exports = CarRegion;
