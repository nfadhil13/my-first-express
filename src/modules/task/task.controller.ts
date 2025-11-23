import { Request, Response } from 'express';
import TaskModel from './model/task.model';
import { v4 } from 'uuid';
import TaskCreateModel from './model/task.create.model';
import { catchAsync } from '../../core/util/catchAsync';
import { AppError } from '../../core/models/apperror';

const taskMap = new Map<string, TaskModel>();

taskMap.set('1', {
  id: '1',
  desc: 'THIS IS DESCRIPTION',
  title: 'title',
});

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task: TaskCreateModel = req.body;
  const id = v4();
  const newTask: TaskModel = {
    id,
    ...task,
  };
  taskMap.set('2', newTask);
  res.status(201).success({
    message: 'TASK CREATED',
    data: newTask,
  });
});

export const getAll = catchAsync(async (_: Request, res: Response) => {
  console.log('getAll');
  res.status(201).success({
    message: 'TASKS FETCHED',
    data: Array.from(taskMap.values()),
  });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!taskMap.has(id)) throw new AppError('TASK NOT FOUND', 404, true, null);
  res.status(200).success({
    data: taskMap.get(id),
  });
});
