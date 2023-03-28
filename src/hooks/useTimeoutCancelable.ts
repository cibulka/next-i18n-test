import { useEffect, useRef } from 'react';

/**
 * @link https://github.com/streamich/react-use/issues/2223
 * @link https://usehooks-ts.com/react-hook/use-timeout
 */
export function useTimeoutCancelable(fn: () => void, delay: number | null) {
  const fnRef = useRef(fn);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    clearTimeout(timeout.current);
    if (typeof delay === 'number') {
      timeout.current = setTimeout(() => fnRef.current(), delay);
    }
    return () => clearTimeout(timeout.current);
  }, [delay]);
}
