import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import LayoutGlobal from '../layouts/LayoutGlobal';
import { TaskProps } from '../types/task';

export default function EditTask() {
  const [taskName, setTaskName] = useState('');
  const [taskContent, setTaskContent] = useState('');

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    isPending,
    isSuccess,
    mutate,
  } = useMutation({
    mutationFn: (task: { task_name: string, task_content: string, task_id: number }) => fetch(`${import.meta.env.VITE_API}/api/task/edit`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify({ ...task, task_state: false }),
    }),
  });

  const handdleSubmit : React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutate({ task_name: taskName, task_content: taskContent, task_id: Number(id) });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      navigate('/task');
    }
  }, [isPending, isSuccess]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/task/id?task_id=${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
      .then((r) => r.json())
      .then((data: TaskProps) => {
        setTaskName(data.task_name);
        setTaskContent(data.task_content);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <LayoutGlobal>
      <div className="w-full max-w-sm px-5 lg:px-10 my-14 flex flex-col gap-4">
        <form className="flex flex-col gap-6 my-10" onSubmit={handdleSubmit}>
          <h1 className="font-bold uppercase text-3xl text-center">Edit Task</h1>
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
            Edit Task
          </button>
        </form>
      </div>
    </LayoutGlobal>
  );
}
