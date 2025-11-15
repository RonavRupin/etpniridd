import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/studyController.js';

const router = express.Router();

// All routes are protected
router.route('/')
  .post(protect, createTask)
  .get(protect, getTasks);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;