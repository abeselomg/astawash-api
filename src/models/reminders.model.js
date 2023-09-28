/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const remindersSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ['birthday', 'anniversary', 'other'],
      required: true,
    },

    description: {
      type: String,
      required: false,
      default:''
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
remindersSchema.plugin(toJSON);
remindersSchema.plugin(paginate);

/**
 * @typedef Reminder
 */
const Reminder = mongoose.model('Reminder', remindersSchema);

module.exports = Reminder;
