import { useState, useCallback } from "react";

export function useAutoDismiss<T>(initialValue: T | null = null, duration = 5000) {
  const [value, setValue] = useState<T | null>(initialValue);

  const setWithTimeout = useCallback((newValue: T | null) => {
    setValue(newValue);
    if (newValue !== null) {
      const timer = setTimeout(() => setValue(null), duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  return [value, setWithTimeout] as const;
}