import { Router } from 'express';
import userRoutes from './users';
import contentRoutes from './contents';
import aiRoutes from './ai';

const router = Router();

router.use('/users', userRoutes);
router.use('/contents', contentRoutes);
router.use('/ai', aiRoutes);

export default router;
