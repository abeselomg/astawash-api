/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const carCodeSchema = mongoose.Schema(
  {
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
carCodeSchema.plugin(toJSON);
carCodeSchema.plugin(paginate);


/**
 * @typedef carCode
 */
const CarCode = mongoose.model('CarCode', carCodeSchema);

module.exports = CarCode;
