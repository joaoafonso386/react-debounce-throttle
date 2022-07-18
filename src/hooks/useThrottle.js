import { useEffect, useRef, useState } from "react"

export const useThrottle = (value, delay) => {

  const isThrottling = useRef(false);
  const [term, setTerm] = useState(value);
  
  useEffect(() => {
    let timer;

    if(!isThrottling) {
      isThrottling.current = true
      setTerm(value)
      timer = setTimeout(() => { 
        isThrottling.current = false
      }, delay || 500)
    }

    return () => {
      clearInterval(timer)
    }

  }, [isThrottling, delay, value])

  return term

}