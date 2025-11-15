import mongoose from 'mongoose';

const StudyTaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Links to the User
  },
  task: {
    type: String,
    required: [true, "Task description is required"],
    trim: true
  },
  isCompleted: {
    type: Boolean,
    default: false // New tasks are not completed by default
  }
}, {
  timestamps: true // Adds 'createdAt'
});

const StudyTask = mongoose.model('StudyTask', StudyTaskSchema);

export default StudyTask;