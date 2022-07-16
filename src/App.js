import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { useDebounce } from "./hooks/useDebounce";
import { debouncer, fakeFetcher } from './utils/utils';
import { debounce } from "lodash"

const App = () => {

  const [throttleInput, setThrottleInput] = useState("");
  const [debounceTermControlled, setDebounceTermControlled] = useState(""); // Original input value
  const debouncedValue = useDebounce(debounceTermControlled, 1000); // Search term after delay

  const [debounceLodashValue, setDebounceLodashValue] = useState("");
  const delayedQuery = useCallback(debounce(value => fakeFetcher(value), 500), []) // Necessary to use useCallback here to prevent that the function is destroyed on rerendering 

  /**
   * Effect to run for the controlled input with a custom hook
   */
  useEffect(() => {
    fakeFetcher(debouncedValue)
  }, [debouncedValue])


  /**
   * Function running for the onChange event
   * @param {object} e 
   */
  const onDebounceLodash = (e) => {
    const { value } = e.target
    setDebounceLodashValue(value)
    delayedQuery(value)
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
        <h2>Throttle Input Controlled</h2>
        <input type="text" value={throttleInput} onChange={(e) => setThrottleInput(e.target.value)}/>
      </div>
    </div>
    
  );
}

export default App;
