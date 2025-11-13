import { Express } from 'express';

import { default as TaskRouter } from './modules/task/task_router';

const setupRoute = (app: Express) => {
  app.use('/task', TaskRouter);
};

export default setupRoute;
