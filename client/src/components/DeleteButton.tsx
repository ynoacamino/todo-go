import { useMutation } from '@tanstack/react-query';
import Button from './ui/Button';

export default function DeleteButton(
  { deleteTask, task_id }: { deleteTask: () => void, task_id: number },
) {
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

  const handdleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    mutate({ task_id });
  };

  if (!isPending && isSuccess) deleteTask();

  return (
    <Button onClick={handdleClick}>
      Delete
    </Button>
  );
}
