import express from 'express';
import { logMood, getMoods } from '../controllers/moodController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes in this file are protected

// @route   POST /api/moods
// @desc    Log a new mood
router.post('/', protect, logMood);

// @route   GET /api/moods
// @desc    Get all of the user's moods
router.get('/', protect, getMoods);

export default router;