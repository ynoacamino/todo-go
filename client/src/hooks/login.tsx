import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const {
    isPending, mutate, isSuccess, data,
  } = useMutation({
    mutationFn: (credentials: { username: string, password: string }) => fetch(`${import.meta.env.VITE_API}/api/auth/login`, {
      method: 'post',
      body: JSON.stringify(credentials),
    }),
  });

  return {
    isPending, mutate, isSuccess, data,
  };
};

export const useHola = () => {
  console.log('hola');
};
