/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const carSchema = mongoose.Schema(
  {
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CarRegion',
      required: true,
    },
    code: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CarCode',
      required: true,
    },
    car_brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CarBrand',
      required: true,
    },
    plate_number: {
      type: String,
      required: true,
      trim: true,
    },

    third_party_expiration_date: {
      type: Date,
      required: true,
    },
    bolo_expiration_date: {
      type: Date,
      required: true,
    },
    full_insurance_expiration_date: {
      type: Date,
      required: true,
    },
    car_cc: {
      type: Number,
      required: false,
    },
    manufacturing_year: {
      type: Number,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
carSchema.plugin(toJSON);
carSchema.plugin(paginate);

/**
 * @typedef Car
 */
const Car = mongoose.model('Car', carSchema);

module.exports = Car;
