import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { TaskProps } from '../types/task';
import Link from './ui/Link';
import Button from './ui/Button';
import CheckBox from './ui/CheckBox';

export default function Task(
  {
    task_name, task_content, task_state, task_id, deleteTask,
  }: TaskProps,
) {
  const navigate = useNavigate();

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: (id: { task_id: number }) => fetch(`${import.meta.env.VITE_API}/api/task/delete`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify(id),
    }),
  });

  const handdleDelete = () => {
    mutate({ task_id });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      deleteTask({ task_id });
      navigate('/task');
    }
  }, [isPending, isSuccess]);
  return (
    <section
      className="w-full rounded-md p-4 bg-zinc-800 flex flex-col gap-3"
    >
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">
          {task_name}
        </h1>
        <CheckBox task_id={task_id} task_state={task_state} />
      </header>
      <p>{task_content}</p>
      <footer className="w-full flex justify-between items-center">
        <span />
        <div className="flex gap-2">
          <Link to={`/task/edit/${task_id}`} isButton className="text-white bg-blue-500 hover:bg-blue-400">
            Edit
          </Link>
          <Button className="text-white" onClick={handdleDelete}>
            Delete
          </Button>
        </div>
      </footer>
    </section>
  );
}
