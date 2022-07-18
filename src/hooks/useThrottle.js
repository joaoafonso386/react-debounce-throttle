import { useEffect, useRef, useMemo, useState, useCallback } from "react";


export const useThrottle = (dataFetcher, delay) => {

  const [isThrottling, setIsThrottling] = useState(true);
  const timerRef = useRef(undefined);

  const throttledFn = useCallback((...args) => {

    if (!isThrottling) return

    setIsThrottling(false);
    dataFetcher(...args);

  },[isThrottling, dataFetcher]);

  useEffect(() => {

    if (!isThrottling) {
      timerRef.current = window.setTimeout(() => {
        setIsThrottling(true);
      }, delay);

      return () => window.clearTimeout(timerRef.current);
    }

  }, [isThrottling, delay]);

  return [throttledFn, isThrottling];

}