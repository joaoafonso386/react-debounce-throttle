import { useState, useEffect } from "react";

/**
 * Taking advantage of useEffect to debounce the value
 * Use the cleanup function (that always runs first) to reset the timeout
 * @param {string} value 
 * @param {number} delay 
 * @returns 
 */
export const useDebounce = (value, delay) => {
  
  const [term, setTerm] = useState(value);

  useEffect(() => {

    const timer = setTimeout(() => {
      setTerm(value)
    }, delay || 500)

    return () => {
      clearTimeout(timer)
    }

  }, [value, delay])

  return term

}
