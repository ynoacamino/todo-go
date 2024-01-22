export const isBoolean = (bool: unknown): bool is boolean => typeof bool === 'boolean';

export const isString = (str: unknown): str is string => {
  if (str) {
    return typeof str === 'string';
  }
  throw new Error('Is not a String');
};

export const isNumber = (dato: unknown): dato is number => typeof dato === 'number';
