// models/Course.model.js

const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  {
    courseOwner: {type: Schema.Types.ObjectId, ref: 'User'},
    courseName: {
      type: String,
      required: [true, 'Course Name is required.']
    },
    date: {
      type: Date,
      required: [true, 'Date is required.']
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required.']
    },
    maxParticipants: Number,
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    address: {
      type: String,
      required: [true, 'Address is required.']
    },
    zip: {
      type: Number,
      required: [true, 'Zip is required.']
    },
    city: {
      type: String,
      required: [true, 'City is required.']
    },
    category: {
      type: String,
      enum: [
        'Climbing',
        'Dance',
        'Functional Training',
        'Material Arts',
        'Pilates',
        'Racket Sports',
        'Strength Training',
        'Swimming',
        'Team Sports',
        'Vibration Training',
        'Water Sports',
        'Yoga'
        ],
      required: [true, 'Category is required.'],
    },
    description:String,
  },

  {
    timestamps: true
  }
);

module.exports = model('Course', courseSchema);