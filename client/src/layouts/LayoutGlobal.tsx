import { ReactNode } from 'react';
import Link from '../components/ui/Link';
import Header from '../components/ui/Header';
import { useUser } from '../contexts/UserContext';
import Button from '../components/ui/Button';

function Rigth() {
  const { user, loadingUser, logOut } = useUser();

  if (loadingUser) {
    return (
      <span className="text-zinc-300">Loading</span>
    );
  }

  if (user) {
    return (
      <>
        <img
          src={user.photo}
          alt={user.username}
          width={60}
          height={60}
          className="bg-zinc-500 rounded-full border-solid border-zinc-200 border-2"
        />
        <span className="text-zinc-300 font-semibold">{user.username}</span>
        <div className="flex-col md:flex-row flex gap-4">
          <Link to="/task" className="py-2 px-4 bg-purple-700 rounded-md hover:bg-purple-600 text-zinc-200">
            Tasks
          </Link>
          <Button onClick={logOut}>
            Log Out
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <Link to="/auth/login">Login</Link>
      <Link to="/auth/register">Register</Link>
      <Link to="/withOutCount" className="py-2 px-4 bg-purple-700 rounded-md hover:bg-purple-600 text-zinc-200">
        Cotinue with out count
      </Link>
    </>
  );
}

export default function LayoutGlobal({ children }: { children: ReactNode }) {
  return (
    <div className="bg-zinc-950 min-h-screen w-full text-zinc-100 flex flex-col items-center justify-start">
      <Header
        left={(<Link to="/" className="font-extrabold uppercase text-4xl">Todo with go</Link>)}
        rigth={<Rigth />}
      />
      {children}
    </div>
  );
}
