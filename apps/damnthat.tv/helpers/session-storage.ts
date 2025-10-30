import { isServer } from './ssr';

export const addToSessionStorage = (key, value) => {
  if (isServer()) return;
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeFromSessionStorage = (key) => {
  if (isServer()) return;
  window.sessionStorage.removeItem(key);
};

export const getFromSessionStorage = (key) => {
  if (isServer()) return;
  const item = window.sessionStorage.getItem(key);

  if (item !== null) {
    return JSON.parse(item);
  }

  return null;
};
