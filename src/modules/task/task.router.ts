import { Router } from 'express';

import { createTask, getAll, getById } from './task.controller';

import { validatorMiddleware } from '../../core/middlewares/validator';

import { z } from 'zod';

const router = Router();

router.get(
  '/:id',
  validatorMiddleware({
    params: z.object({
      id: z.string().uuidv4(),
    }),
  }),
  getById,
);
router.get('/', getAll);
router.post('/', createTask);

export default router;
