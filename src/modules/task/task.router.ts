import { Router } from 'express';

import { createTask, getAll, getById } from './task.controller';

const router = Router();

router.get('/:id', getById);
router.get('/', getAll);
router.post('/', createTask);

export default router;
