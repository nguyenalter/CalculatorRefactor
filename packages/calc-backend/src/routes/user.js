import express from 'express';
import * as userController from '../controllers/user';
import { validateUserData } from '../middleware/validate-request';

const router = express.Router();

router.post('/signup', validateUserData, userController.signUp);

router.post('/signin', validateUserData, userController.signIn);

export default router;
