import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Usage of isThrottling to control when the data fetcher should be called
 * Usage of useRef to persist the value on rerendering making sure the timer is correct
 * @param {function} dataFetcher - The function to be throttled
 * @param {number} delay - Number of milliseconds to delay 
 * @returns {array} throttled function
 */

export const useThrottle = (dataFetcher, delay) => {

  const [isThrottling, setIsThrottling] = useState(true);
  const timerRef = useRef(undefined);

  const throttledFn = useCallback((value) => {

    if (!isThrottling) return

    setIsThrottling(false);
    dataFetcher(value);

  },[isThrottling, dataFetcher]);

  useEffect(() => {

    if (!isThrottling) {
      timerRef.current = setTimeout(() => {
        setIsThrottling(true);
      }, delay);

      return () => clearTimeout(timerRef.current);
    }

  }, [isThrottling, delay]);

  return throttledFn;

}