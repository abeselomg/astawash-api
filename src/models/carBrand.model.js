/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const carBrandSchema = mongoose.Schema(
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
carBrandSchema.plugin(toJSON);
carBrandSchema.plugin(paginate);


/**
 * @typedef CarBrand
 */
const CarBrand = mongoose.model('CarBrand', carBrandSchema);

module.exports = CarBrand;
