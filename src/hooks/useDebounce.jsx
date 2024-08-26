import {useState} from "react";

function useDebounce(callback, delay = 300) {
  const [timer, setTimer] = useState();

  return (...args) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimer(newTimer);
  };
}

export default useDebounce
