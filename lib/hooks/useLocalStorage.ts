import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export function useLocalStorage(key: any, initialValue: any) {
  const localStorageValue = JSON.parse(
    JSON.stringify(localStorage.getItem(key))
  );
  const [value, setValue] = useState(localStorageValue ?? initialValue);
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
}

export function useCookie(cookieKey: any, initialValue: any) {
  const cookieValue = Cookies.get(cookieKey);
  const [value, setValue] = useState(cookieValue ?? initialValue);
  useEffect(() => {
    Cookies.set(cookieKey, value);
    console.log('COOKIE VAL: ', value);
  }, [value, cookieKey]);
  return [value, setValue];
}
