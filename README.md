# Debounce & Throttle Implementations

- What is debouncing? 
  - Call a function only after a certain amount of time has passed. Define the time you want for the function to be called and enjoy the advantages of not spamming API's (for example)
  - In debouncing the function will run only at the END of user interaction

- What is throttling? debouncing means 
  - Create a limit for the number of times a function can be called in a certain amount of time. This is also a good technique to not spam API's
  - In throttling the function will run at the BEGINNING and the will continue to run based on the delay/time that you apply for throttling

*Using custom functions for debouncing and throttling*