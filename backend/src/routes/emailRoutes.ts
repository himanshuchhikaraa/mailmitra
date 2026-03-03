import { Router } from 'express';
import { generateEmailController, checkLimitController } from '../controllers/emailController';

const router = Router();

// Generate cold email
router.post('/generate', generateEmailController);

// Check remaining daily limit
router.get('/limit', checkLimitController);

export default router;
