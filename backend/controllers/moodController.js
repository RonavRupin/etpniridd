import MoodLog from '../models/MoodSchema.js';

// @desc    Log a new mood
// @route   POST /api/moods
// @access  Private
export const logMood = async (req, res) => {
  try {
    const { mood, note } = req.body;

    // Get user ID from the 'protect' middleware
    const userId = req.user.id;

    if (!mood) {
      return res.status(400).json({ success: false, message: "A 'mood' value (1-5) is required" });
    }

    const newMoodLog = await MoodLog.create({
      user: userId,
      mood: mood,
      note: note
    });

    res.status(201).json({
      success: true,
      message: "Mood logged successfully",
      data: newMoodLog
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all moods for the logged-in user
// @route   GET /api/moods
// @access  Private
export const getMoods = async (req, res) => {
  try {
    // Get user ID from the 'protect' middleware
    const userId = req.user.id;

    const moods = await MoodLog.find({ user: userId }).sort({ createdAt: 'desc' });

    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};