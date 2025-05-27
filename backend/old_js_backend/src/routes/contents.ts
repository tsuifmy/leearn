import { Router } from 'express';
import { getContents, createContent, likeContent } from '../controllers/contentController';

const router = Router();

router.get('/', getContents);
router.post('/', createContent);
router.post('/:contentId/like', likeContent);

export default router;
