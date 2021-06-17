import express from 'express';
import { calculate } from '../controllers/calculate';
import { validateCalculateData } from '../middleware/validate-request';

const router = express.Router();

router.post('/', validateCalculateData, calculate);

export default router;
