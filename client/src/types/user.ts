import { isNumber, isString } from '../utils/parserType';

export interface User {
  username: string
  complete_name: string
  user_id: number
  photo: string
}

export const parseUser = (user: unknown): user is User => {
  if (!user || typeof user !== 'object') {
    throw new Error('This object is not a User');
  }
  if (
    'username' in user
    && 'complete_name' in user
    && 'user_id' in user
    && 'photo' in user
  ) {
    return (
      isString(user.photo)
      && isString(user.complete_name)
      && isString(user.username)
      && isNumber(user.user_id)
    );
  }
  throw new Error('This object is not a User');
};
