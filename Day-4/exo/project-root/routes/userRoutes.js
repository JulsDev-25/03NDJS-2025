import express from 'express'
import { protect } from '../middleware/authmiddleware.js';
import {registerUser, loginUser, me} from '../controlleurs/userController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Route protégée
router.get('/me', protect, me);

export default router;