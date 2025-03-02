import { useRef, useState } from 'react';

function getRandomIntInclusive(min, max) {
  // Убедимся, что min и max — целые числа.
  min = Math.ceil(min);
  max = Math.floor(max);
  // Генерация рандомного целого числа в диапазоне [min, max], включая min и max.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Timer = ({ children, ...props }) => {
  return children(useTimer(props));
}

export const useTimer = ({ count, timeFrom, timeTo, pause, isClick }) => {
  const ref = useRef();
  const refTimer = useRef();


  const [timer, setTimer] = useState(0);
  const [state, setState] = useState({ current: null, time: 0, paused: false, stop: true });

  const stepPaused = (current, time = pause) => {
    setState(prev => ({ ...prev, time, paused: true, stop: false }));

    ref.current = setTimeout(() => {
      if (time === 0) {
        step(current + 1);
        return;
      }

      stepPaused(current, time - 1);
    }, 1000);
  }

  const step = (current, time = getRandomIntInclusive(timeFrom, timeTo)) => {
    setState(prev => ({ ...prev, current, time, paused: false, stop: false }));

    ref.current = setTimeout(() => {
      if (time === 0) {
        if (current === count - 1) {
          setState(prev => ({ ...prev, current, paused: false, stop: true }));
          clearInterval(refTimer.current);
          return;
        }

        stepPaused(current);
        return;
      }

      step(current, time - 1);
    }, 1000);
  }

  return {
    ...state,
    timer,
    onNext: () => {
      if (state.current === count - 1) {
        setState(prev => ({ ...prev, paused: false, stop: true }));
        clearInterval(refTimer.current);
        return;
      }
      setState(prev => ({ ...prev, pause: false, stop: false, current: prev.current + 1, }));
    },
    onStart: () => {
      setTimer(0);
      
      if (!isClick) {
        stepPaused(-1);
      } else {
        setState(prev => ({ ...prev, pause: false, stop: false, current: 0 }));
      }
      refTimer.current = setInterval(() => { setTimer(prev => prev + 1) }, 1000)
    },
    onStop: () => {
      clearTimeout(ref.current);
      clearInterval(refTimer.current);
      setTimer(0);
      setState({ current: null, time: 0, paused: false, stop: true })
    }
  };
};