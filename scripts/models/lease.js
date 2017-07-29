var mongoose = require('mongoose');

var LeaseSchema = mongoose.Schema({
  begins: { type: Date },
  ends: { type: Date },
  balance: { type: Number },
  pets: { type: Boolean, default: false },
  tenants: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  property: { type: mongoose.Schema.ObjectId, ref: 'Property'},
  notes: [{ type: String }]
});

var LeaseSchema = module.exports = mongoose.model('Lease', LeaseSchema);
