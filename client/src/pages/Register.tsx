import { useMutation } from '@tanstack/react-query';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [completeName, setCompleteName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {
    loadingLogin, login, user, loadingUser,
  } = useUser();

  const {
    isPending, isSuccess, mutate,
  } = useMutation({
    mutationFn: (credentials : { username: string, completeName: string, password: string }) => fetch(`${import.meta.env.VITE_API}/api/auth/register`, {
      method: 'post',
      body: JSON.stringify(credentials),
    }),
  });

  if (!loadingUser && user) {
    navigate('/tasks');
    return null;
  }

  const handdleSubmit : React.EventHandler<FormEvent> = (e) => {
    e.preventDefault();
    mutate({ username, password, completeName });
  };

  if (isSuccess) {
    login({ user_password: password, username })
      .catch((err) => console.error(err));
  }

  return (
    <form className="flex flex-col gap-6 my-10" onSubmit={handdleSubmit}>
      <h1 className="font-bold uppercase text-3xl text-center">Register</h1>
      <label className="flex flex-col gap-1">
        <span className="text-sm">
          Username
        </span>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="bg-zinc-700 border-0 rounded-md px-2 py-1 text-2xl"
          value={username}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">
          Complete name
        </span>
        <input
          type="text"
          className="bg-zinc-700 border-0 rounded-md px-2 py-1 text-2xl"
          onChange={(e) => setCompleteName(e.target.value)}
          value={completeName}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">
          Password
        </span>
        <input
          type="password"
          className="bg-zinc-700 border-0 rounded-md px-2 py-1 text-2xl"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button
        type="submit"
        className="py-2 px-4 bg-purple-700 rounded-md hover:bg-purple-600 my-5"
        disabled={isPending || loadingLogin}
      >
        {
          isPending || loadingLogin ? 'Loading' : 'Register'
        }
      </button>
    </form>
  );
}
