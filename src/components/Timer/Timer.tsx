import { useRef, useState } from 'react';

function getRandomIntInclusive(min, max) {
  // Убедимся, что min и max — целые числа.
  min = Math.ceil(min);
  max = Math.floor(max);
  // Генерация рандомного целого числа в диапазоне [min, max], включая min и max.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Timer = ({ count, timeFrom, timeTo, pause, children }) => {
  const ref = useRef();
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
          return;
        }

        stepPaused(current);
        return;
      }

      step(current, time - 1);
    }, 1000);
  }

  return children({
    ...state,
    onStart: () => {
      stepPaused(-1)
    },
    onStop: () => {
      clearTimeout(ref.current);
      setState({ current: null, time: 0, paused: false, stop: true })
    }
  });
}