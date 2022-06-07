import { useState, useEffect } from 'react';

const getLocalValue = <T,>(key: string, initialValue: T): T => {
  // SSR Next.js
  if (typeof window === 'undefined') return initialValue;

  const getItemValueString = localStorage.getItem(key);
  // if a value is already stored
  const localValue = getItemValueString
    ? (JSON.parse(getItemValueString) as T)
    : undefined;

  if (localValue) return localValue;

  // return result of a function
  if (initialValue instanceof Function) {
    return initialValue();
  }

  return initialValue;
};

const useLocalStorage = <T,>(
  key: string,
  initValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  // const getItemValueString = localStorage.getItem(key);

  const [value, setValue] = useState(
    // getItemValueString ? (JSON.parse(getItemValueString) as T) : initValue
    () => {
      return getLocalValue<T>(key, initValue);
    }
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
