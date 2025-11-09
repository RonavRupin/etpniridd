import express from 'express';
import { 
    signup, 
    login, 
    getProfile, 
    updateProfile, 
    deleteProfile,
    logout,
    getAllUsers,
    chat//added
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile);
router.post('/logout', protect, logout);
router.post('/chat', protect, chat);//add

// Admin route (add admin middleware if needed)
router.get('/users', protect, getAllUsers);

export default router;