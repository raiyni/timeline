import { useCallback, useEffect } from "preact/hooks";

export const useDebounce = (effect: any, delay: number , deps: any) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
      const handler = setTimeout(() => {
          callback();
      }, delay);

      return () => {
          clearTimeout(handler);
      };
  }, [callback, delay]);
}
