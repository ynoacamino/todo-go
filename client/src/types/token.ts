export interface Token {
  value: string
}

export const parseToken = (token: unknown): token is Token => {
  if (!token || typeof token !== 'object') {
    throw new Error('Invalid Token');
  }

  if ('value' in token && typeof token.value === 'string') {
    return true;
  }
  throw new Error('Invalid Token');
};
