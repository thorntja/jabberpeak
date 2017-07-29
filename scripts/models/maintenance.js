var mongoose = require('mongoose');

var MaintenanceSchema = mongoose.Schema({
  submitted: { type: Date },
  by: { type: String },
  property: { type: mongoose.Schema.ObjectId, ref: 'Property'},
  notes: [{ type: String }]
});

var MaintenanceSchema = module.exports = mongoose.model('Maintenance', MaintenanceSchema);
