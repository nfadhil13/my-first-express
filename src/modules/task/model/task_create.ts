import Task from './task';

type TaskCreate = Omit<Task, 'id'>;

export default TaskCreate;
