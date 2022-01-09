const { useState, useRef, useEffect } = require("react");

function useTimer(initially) {
  const [value, setValue] = useState(initially);
  const ref = useRef(null);

  const startTimer = () => {
    if (!ref.current) {
      ref.current = setInterval(() => {
        setValue((prev) => {
          if (prev - 1 === 0) {
            pauseTimer();
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  const resetTimer = () => {
    pauseTimer();
    setValue(initially);
  };

  useEffect(() => {
    // cleanup
    return pauseTimer();
  }, []);

  return { value, startTimer, pauseTimer, resetTimer };
}

export default useTimer;
