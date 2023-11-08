import express from 'express';

import { Login, getAuthUser, signUp, logout } from '../controllers/userContoller';
const router = express.Router();

router.get('/', getAuthUser);
router.post('/signup', signUp);
router.post('/login', Login);
router.post('/logout', logout)

export default router;
