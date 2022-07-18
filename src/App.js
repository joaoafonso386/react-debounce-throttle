import React, { useEffect, useState, useMemo, useRef } from 'react';
import './App.css';
import { useDebounce } from "./hooks/useDebounce";
import { useThrottle } from './hooks/useThrottle';
import { debouncer, fakeFetcher, throttler } from './utils/utils';
import { debounce, throttle} from "lodash"

const App = () => {

  const [debounceTermControlled, setDebounceTermControlled] = useState(""); // Original input value
  const debouncedValue = useDebounce(debounceTermControlled, 1000); // Search term after delay

  const [debounceLodashValue, setDebounceLodashValue] = useState("");
  const delayedDebounce = useMemo(() => debounce(value => fakeFetcher(value), 500), []) // Necessary to use useMemo here to prevent the function from being destroyed on rerendering 

  const [throttleInputControlled, setThrottleInputControlled] = useState("");
  useThrottle(() => fakeFetcher(throttleInputControlled), 1000, [throttleInputControlled]);

  const [throttleInputLodash, setThrottleInputLodash] = useState("");
  const delayedThrottle = useMemo(() => throttle(value => fakeFetcher(value), 1000), []) // useMemo again for the same reason off the debounce case

  /**
   * Effect to run for the controlled input with a custom hook (debounce)
   */
  useEffect(() => {
    fakeFetcher(debouncedValue)
  }, [debouncedValue])

  /**
   * Effect to run for the controlled input with a custom hook (throttle)
   */
  // useEffect(() => {
  //   fakeFetcher(throttledValue)
  // }, [throttledValue])


  /**
   * Function running for the onChange event
   * @param {object} e 
   */
  const onDebounceLodash = (e) => {
    const { value } = e.target
    setDebounceLodashValue(value)
    delayedDebounce(value)
  }

  const onThrottleLodash = (e) => {
    const { value } = e.target
    setThrottleInputLodash(value)
    delayedThrottle(value)
  }

  
  return (

    <div className='App'>
      <div>
        <h2>Debounce Input Uncontrolled</h2>
        <p>Will output to the console the value to be fetched using a custom function</p>
        <input type="text" onChange={debouncer(fakeFetcher, 1000)}/>
      </div>
      <div>
        <h2>Debounce Input Controlled</h2>
        <p>Will output to the console the value to be fetched using a custom hook</p>
        <input type="text" value={debounceTermControlled} onChange={(e) => setDebounceTermControlled(e.target.value)}/>
      </div>
      <div>
        <h2>Debounce Input Controlled using Lodash</h2>
        <p>Will output to the console the value to be fetched using the js library Lodash</p>
        <input type="text" value={debounceLodashValue} onChange={onDebounceLodash}/>
      </div>
      <div>
        <h2>Throttle Input Uncontrolled</h2>
        <p>Will output to the console the value to be fetched using a custom function</p>
        <input type="text" onChange={throttler(fakeFetcher, 1000)}/>
      </div>
      <div>
        <h2>Throttle Input Controlled</h2>
        <input type="text" value={throttleInputControlled} onChange={(e) => setThrottleInputControlled(e.target.value)}/>
      </div>
      <div>
        <h2>Throttle Input Controlled using Lodash</h2>
        <p>Will output to the console the value to be fetched using the js library Lodash</p>
        <input type="text" value={throttleInputLodash} onChange={onThrottleLodash}/>
      </div>
    </div>
    
  );
}

export default App;
