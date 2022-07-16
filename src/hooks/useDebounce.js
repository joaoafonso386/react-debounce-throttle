import { useState, useEffect } from "react";


export const useDebounce = (value, delay) => {
  
  const [term, setTerm] = useState(value);

  useEffect(() => {

    const timer = setTimeout(() => {
      setTerm(value)
    }, delay || 500)

    return () => {
      clearInterval(timer)
    }

  }, [value, delay])

  return term

}
