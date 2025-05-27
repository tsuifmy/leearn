import { Router } from 'express';
import { chatWithAI, getStudyPlan } from '../controllers/aiController';

const router = Router();

router.post('/chat', chatWithAI);
router.post('/study-plan', getStudyPlan);

export default router;
