// models/Course.model.js

const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  {
    courseOwner: {type: Schema.Types.ObjectId, ref: 'User'},
    date: Date,
    startTime: String,
    maxParticipants: Number,
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    adress: String,
    category: {
      type: String,
      enum: ['Yoga', 'Kickboxing','Jogging']
    },
    description:String,
  }
);

module.exports = model('Course', courseSchema);