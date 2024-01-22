import { isBoolean, isNumber, isString } from '../utils/parserType';

export interface Task {
  task_name: string
  task_content: string
  task_state: boolean
  task_created_date: number
  task_id: number
}

export interface TaskProps extends Task {
  deleteTask: ({ task_id }: { task_id:number }) => void
}

export const parserTask = (task: unknown): task is Task => {
  if (!task || typeof task !== 'object') throw new Error('This object is not a Task');

  if (
    'task_name' in task
    && 'task_content' in task
    && 'task_state' in task
    && 'task_id' in task
  ) {
    return (
      isString(task.task_name)
      && isString(task.task_content)
      && isNumber(task.task_id)
      && isBoolean(task.task_state)
    );
  }

  throw new Error('This object is not a Task');
};
