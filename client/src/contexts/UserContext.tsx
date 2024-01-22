/* eslint-disable react-refresh/only-export-components */
import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { parseToken } from '../types/token';
import { User, parseUser } from '../types/user';

interface UserContextType {
  login : (credentials: { user_password: string, username: string }) => Promise<void>
  logOut: () => void
  loadingLogin: boolean
  user: User | undefined
  loadingUser: boolean
}

const userContext = createContext<UserContextType>({
  login: async () => {},
  logOut: () => {},
  loadingLogin: false,
  user: undefined,
  loadingUser: false,
});

export const useUser = () => useContext(userContext);

export function UserProvider({ children } : { children : React.ReactNode }) {
  const [loadingLogin, setLoadingLogin] = useState(false);

  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState(false);

  const login = async (credentials : { user_password: string, username: string }) => {
    setLoadingLogin(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API}/api/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Error in request');
      }

      const token = await response.json() as unknown;

      if (parseToken(token)) {
        localStorage.setItem('userToken', token.value);
        setLoadingLogin(false);
        window.location.reload();
      }
    } catch (error) {
      setLoadingLogin(false);
      console.error(error);
    }
  };

  const getUser = async (): Promise<void> => {
    setLoadingUser(true);
    const res = await fetch(`${import.meta.env.VITE_API}/api/task/user`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    });

    if (!res.ok) {
      throw new Error('Error de autenticacion');
    }
    const userToken: unknown = await res.json();

    if (parseUser(userToken)) {
      setUser(userToken);
    } else {
      setLoadingUser(false);
      throw new Error('The object is not a User');
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    const tk = localStorage.getItem('userToken');
    if (tk) {
      getUser()
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem('userToken');
    setUser(undefined);
    setLoadingLogin(false);
    setLoadingUser(false);
    window.location.reload();
  };

  return (
    <userContext.Provider value={{
      login,
      logOut,
      loadingLogin,
      user,
      loadingUser,
    }}
    >
      {children}
    </userContext.Provider>
  );
}
