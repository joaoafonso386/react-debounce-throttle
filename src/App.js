import React from 'react';
import './App.css';
import { useState } from "react";

function App() {

  const [throttleInput, setThrottleInput] = useState("");

  /**
   * Setting up a fake fetch function that simuates getting some data from an API 4ex
   */

  const fakeFetcher = (inputValue) => {
    if(inputValue) console.log(`The value to fetch is ${inputValue}`)
  }
  
  
  /**
   * Debounce input should wait for X seconds before it fetches the data
   * While its fetching it should not make more requests
   * This is useful for spamming reasons (4ex spamming an endpoint that should not handle multiple requests in seconds)  
   */

  const debouncer = (dataFetcher, time) => {
    let timer;
    return (e) => {
      const { value } = e.target
      clearTimeout(timer);
      timer = setTimeout(() => dataFetcher(value), time)
    }

  }



  return (

    <div>
      <div>
        <h2>Debounce Input</h2>
        <input type="text" onChange={debouncer(fakeFetcher, 1000)}/>
      </div>
      <div>
        <h2>Throttle Input</h2>
        <input type="text" value={throttleInput} onChange={(e) => setThrottleInput(e.target.value)}/>
      </div>
    </div>
    
  );
}

export default App;
