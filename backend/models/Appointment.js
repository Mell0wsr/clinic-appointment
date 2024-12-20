const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  idNumber: { type: String, required: true, length: 13 },
  reason: { type: String, required: true },
  otherReason: { type: String },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
