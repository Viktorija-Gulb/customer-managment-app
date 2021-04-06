import { useEffect, useState } from "react";
import { User } from "../Types";

export const useStickyState = (defaultValue: User[], key: string) => {
  const [value, setValue] = useState(() => {

    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}