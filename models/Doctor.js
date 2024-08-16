const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  availability: {
    type: [{
      day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      startTime: {
        type: String
      },
      endTime: {
        type: String
      }
    }],
    default: []
  },
  image: {
    type: String, // URL or path to the image
    required: false
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
