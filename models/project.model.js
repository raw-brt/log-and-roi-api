const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    minlength: [3, 'Your project should have a name with, at least, three characters'],
    maxlength: [50, 'Your project name should have less than fifty characters'],
    unique: true,
    trim: true,
  },
    costPerHour: {
      type: Number,
      default: 0,
      required: [true, 'You have to input a cost per hour']  
  },
    totalCost: Number,
    roi: Number,
    logs: [mongoose.Schema.Types.ObjectId],
    owner: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;