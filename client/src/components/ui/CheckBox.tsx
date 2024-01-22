import { useState } from 'react';
import './CheckBox.css';

export default function CheckBox({ task_id, task_state }:{ task_id: number, task_state: boolean }) {
  const [state, setState] = useState(task_state);

  const handdleChange = () => {
    fetch(`${import.meta.env.VITE_API}/api/task/complete`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
      body: JSON.stringify({ task_state: !state, task_id }),
    }).then((res) => {
      if (res.ok) {
        setState((st) => !st);
      }
    }).catch((err) => console.error(err));
  };

  return (
    <div className="checkbox-container">
      <input type="checkbox" id={String(task_id)} checked={state} onChange={handdleChange} />
      <label htmlFor={String(task_id)} />
    </div>
  );
}
