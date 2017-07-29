var mongoose = require('mongoose');

var AppointmentSchema = mongoose.Schema({
  time: { type: Date },
  location: { type: String },
  description: { type: String }
});

var AppointmentSchema = module.exports = mongoose.model('Appointment', AppointmentSchema);
