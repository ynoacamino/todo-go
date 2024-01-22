import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import LayoutGlobal from '../layouts/LayoutGlobal';

export default function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [taskContent, setTaskContent] = useState('');

  const navigate = useNavigate();

  const {
    isPending,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: (task: { task_name: string, task_content: string }) => fetch(`${import.meta.env.VITE_API}/api/task/add`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify({ ...task, task_state: false, task_created_date: 12345 }),
    }),
  });

  const handdleSubmit : React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ task_name: taskName, task_content: taskContent });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      navigate('/task');
    }
  }, [isPending, isSuccess]);

  return (
    <LayoutGlobal>
      <div className="w-full max-w-sm px-5 lg:px-10 my-14 flex flex-col gap-4">
        <form className="flex flex-col gap-6 my-10" onSubmit={handdleSubmit}>
          <h1 className="font-bold uppercase text-3xl text-center">Add Task</h1>
          <label className="flex flex-col gap-1">
            <span className="text-sm">
              Task Name
            </span>
            <input
              type="text"
              className="bg-zinc-700 border-0 rounded-md px-2 py-1 text-2xl"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm">
              Content
            </span>
            <textarea
              className="bg-zinc-700 border-0 rounded-md px-2 py-1 text-2xl"
              value={taskContent}
              rows={5}
              onChange={(e) => setTaskContent(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="py-2 px-4 bg-purple-700 rounded-md hover:bg-purple-600 my-5"
          >
            Add Task
          </button>
        </form>
      </div>
    </LayoutGlobal>
  );
}
