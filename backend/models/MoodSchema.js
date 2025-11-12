import mongoose from 'mongoose';

const MoodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // This links it to your UserSchema.js
  },
  mood: {
    type: Number,
    required: [true, "Mood rating (1-5) is required"],
    min: 1,
    max: 5
  },
  note: {
    type: String,
    trim: true,
    maxlength: [280, "Note cannot be more than 280 characters"]
  }
}, {
  timestamps: true // This automatically adds 'createdAt' and 'updatedAt'
});

const MoodLog = mongoose.model('MoodLog', MoodSchema);

export default MoodLog;