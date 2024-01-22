import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';
import LayoutGlobal from '../layouts/LayoutGlobal';
import Task from '../components/Task';
import Link from '../components/ui/Link';
import { Task as TaskType, parserTask } from '../types/task';

export default function Tasks() {
  const { user, loadingUser } = useUser();
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState<TaskType[]>();

  useEffect(() => {
    if (!loadingUser && !user) navigate('/auth/login');
  }, [loadingUser, user]);

  const { data, error, isLoading } = useQuery<unknown[]>({
    queryFn: () => fetch(`${import.meta.env.VITE_API}/api/task`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    }).then((res) => res.json()),
    queryKey: ['getTasks'],
  });

  const deleteTask = ({ task_id }: { task_id: number }) => {
    const tareas = taskList?.filter((t) => t.task_id !== task_id);
    setTaskList(tareas);
  };

  useEffect(() => {
    if (data) {
      const tareas: TaskType[] = data.map((task) => {
        if (parserTask(task)) {
          return task;
        }
        throw new Error('Invalid request data');
      });
      setTaskList(tareas);
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <LayoutGlobal>
      <div className="w-full max-w-7xl px-5 lg:px-10 my-14 flex flex-col gap-4">
        <div className="w-full flex justify-start items-center ">
          <Link to="/task/add" isButton className="bg-green-700 text-zinc-200 hover:bg-green-600">
            Add Task
          </Link>
        </div>
        <div className="w-full  gap-4 grid md:grid-cols-2 lg:grid-cols-3">
          {
            taskList?.map((t) => (
              <Task
                task_content={t.task_content}
                task_created_date={t.task_created_date}
                task_id={t.task_id}
                task_name={t.task_name}
                task_state={t.task_state}
                key={t.task_id}
                deleteTask={deleteTask}
              />
            ))
          }
        </div>
      </div>
    </LayoutGlobal>
  );
}
