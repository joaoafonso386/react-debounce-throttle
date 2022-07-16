import React, { useEffect } from 'react';
import './App.css';
import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { debouncer, fakeFetcher } from './utils/utils';

const App = () => {

  const [throttleInput, setThrottleInput] = useState("");
  const [debounceTermControlled, setDebounceTermControlled] = useState(""); // Original input value
  const debouncedValue = useDebounce(debounceTermControlled, 1000); // Search term after delay

  useEffect(() => {
    fakeFetcher(debouncedValue)
  }, [debouncedValue])
  
  return (

    <div>
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
        <h2>Throttle Input</h2>
        <input type="text" value={throttleInput} onChange={(e) => setThrottleInput(e.target.value)}/>
      </div>
    </div>
    
  );
}

export default App;
