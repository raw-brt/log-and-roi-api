const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  logName: {
    type: String,
    required: [true, 'Log name is required'],
    minlength: [3, 'Your log should have a name with, at least, three characters'],
    maxlength: [25, 'Your log name should have less than fifty characters'],
    trim: true
  },
  running: {
    type: Boolean,
    default: false
  },
  finishedAt: {
    type: Date,
    default: null
  },
  cost: {
    type: Number,
    default: 0
  },
  parentProject: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;