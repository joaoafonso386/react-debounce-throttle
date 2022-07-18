 /**
  * Setting up a fake fetch function that simuates getting some data from an API 4ex
  * @param inputValue
  */

  const fakeFetcher = (inputValue) => {
    const conditions = [0, "", null, undefined];
    const value = inputValue.trim().toLowerCase();
    
    if(!conditions.includes(value)) console.log(`The value to fetch is ${value}`)
  }


  /**
   * Debounce function that should wait for X seconds before it fetches the data
   * While its fetching it should not make more requests
   * @param dataFetcher - Function responsible for the request
   * @param delay - Number of milliseconds to delay
   * @returns Function to be consumed in the onChange method
   */

   const debouncer = (dataFetcher, delay) => {
    let timer;
    return (e) => {
      const { value } = e.target
      clearTimeout(timer);
      timer = setTimeout(() => dataFetcher(value), delay || 500)
    }

  }

  const throttler = (dataFetcher, delay) => {
    let isThrottling = false;
    return (e) => {
      if(!isThrottling) {
        isThrottling = true;
        const { value } = e.target
        dataFetcher(value)
        setTimeout(() => isThrottling = false , delay || 500)
      }
    }
  }


  

  export { fakeFetcher, debouncer, throttler }