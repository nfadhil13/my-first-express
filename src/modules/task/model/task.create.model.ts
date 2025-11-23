import TaskModel from './task.model';

type TaskCreateModel = Omit<TaskModel, 'id'>;

export default TaskCreateModel;
