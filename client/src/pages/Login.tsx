import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const {
    loadingLogin, login, loadingUser, user,
  } = useUser();

  const handdleSubmit : React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login({ username, user_password: password })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!loadingLogin && !loadingUser && user) {
      navigate('/task');
    }
  }, [loadingLogin, loadingUser, user]);

  return (
    <form className="flex flex-col gap-6 my-10" onSubmit={handdleSubmit}>
      <h1 className="font-bold uppercase text-3xl text-center">Login</h1>
      <label className="flex flex-col gap-1">
        <span className="text-sm">
          Username
        </span>
        <input
          type="text"
          className="bg-zinc-700 border-0 rounded-md px-2 py-1 text-2xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">
          Password
        </span>
        <input
          type="password"
          className="bg-zinc-700 border-0 rounded-md px-2 py-1 text-2xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="py-2 px-4 bg-purple-700 rounded-md hover:bg-purple-600 my-5"
        disabled={loadingLogin}
      >
        {
          loadingLogin ? 'Loading' : 'Login'
        }
      </button>
    </form>
  );
}
