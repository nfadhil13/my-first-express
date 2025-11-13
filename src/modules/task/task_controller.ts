import { Request, Response } from 'express';
import Task from './model/task';
import { v4 as uuid } from 'uuid';
import TaskCreate from './model/task_create';

const taskMap = new Map<string, Task>();

taskMap.set('1', {
  id: '1',
  desc: 'THIS IS DESCRIPTION',
  title: 'title',
});

export const createTask = (req: Request, res: Response) => {
  const task: TaskCreate = req.body;
  console.log(req.body);
  const id = uuid();
  const newTask: Task = {
    id,
    ...task,
  };
  taskMap.set(id, newTask);
  res.json(newTask);
};

export const getAll = (_: Request, res: Response) => {
  res.json(Array.from(taskMap.values()));
};

export const getById = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!taskMap.has(id)) {
    res.status(404).json({
      message: 'NOT FOUND',
    });
    return;
  }
  res.status(200).json(taskMap.get(id));
};
