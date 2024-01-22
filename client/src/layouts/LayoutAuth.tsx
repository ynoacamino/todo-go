import { Outlet } from 'react-router-dom';
import Link from '../components/ui/Link';
import Header from '../components/ui/Header';

import todos from '../assets/images/todos.png';

export default function LayoutAuth() {
  return (
    <div className="bg-zinc-950 min-h-screen w-full text-zinc-100 flex flex-col items-center justify-start">
      <Header
        left={(<div />)}
        rigth={(
          <>
            <Link to="/">Home</Link>
            <Link to="/tasks">Tasks</Link>
          </>
        )}
      />
      <div className="w-full max-w-sm flex flex-col justify-center items-center gap-10">
        <h1 className="font-extrabold uppercase text-4xl">
          Todo list with go
        </h1>
        <img src={todos} alt="todos" className="w-full max-w-[200px]" />
      </div>
      <Outlet />
      <footer className="flex gap-4 text-zinc-400">
        <Link to="/auth/login">Login</Link>
        {' | '}
        <Link to="/auth/register">Register</Link>
      </footer>
    </div>
  );
}
