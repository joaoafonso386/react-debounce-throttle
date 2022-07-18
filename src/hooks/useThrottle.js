import { useEffect, useRef } from "react"

export const useThrottle = (dataFetcher, delay, deps = []) => {

  const lastRan = useRef(Date.now());
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= delay) {
        dataFetcher();
        lastRan.current = Date.now();
      }
    }, delay - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  },
  [delay, ...deps])

}