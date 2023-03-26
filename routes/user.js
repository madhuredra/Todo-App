import express from 'express';
import {register,login,getUserDetails,logout} from '../controllers/user.js';
import {isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();

// router.get('/all' , getAllUsers);
router.get('/me' ,isAuthenticated, getUserDetails)

router.post('/register' , register);
router.post('/login' , login);
router.get('/logout' , logout);

export default router;