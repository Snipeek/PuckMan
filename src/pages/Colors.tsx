import { useMemo } from 'react';
import {Form, useFrom} from "../components/Form/Form";
import {Menu} from "../components/Menu/Menu";
import {Button} from "../components/Button/Button";
import styles from './style.module.css';
import {Timer} from "../components/Timer/Timer";
import {shuffleArray} from "../helpers";

function generateDistinctColors(n) {
  const colors = [];

  for (let i = 0; i < n; i++) {
    // 360 градусов по цветовому кругу делим на количество цветов
    const hue = Math.round((360 / n) * i);
    // Держим насыщенность и яркость постоянными
    const saturation = 70; // 70% насыщенность
    const lightness = 50;  // 50% яркость

    // Формируем HSL цвет
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    colors.push(color);
  }

  return colors;
}

export const Colors = () => {
  const { state, ...other } = useFrom();

  const colors = useMemo(() => (
    shuffleArray(generateDistinctColors(state.count || 1))
  ), [state.count]);

  return (
    <>
      <Form {...other} />
      <Timer {...state}>
        {({ stop, current, paused, time, onStart, onStop }) => (
          <>
            <div className={styles.item} style={{ background: !paused && !stop ? colors[current] : null }}>
              {stop && 'Тут будет цвет'}
              {paused && `Пауза: ${time}`}
              {!paused && !stop && `${time}`}
            </div>
            <div className={styles.preview}>
              {colors.map(color => (
                <div style={{background: color}} />
              ))}
            </div>
            <Button onClick={stop ? onStart : onStop} children={stop ? 'Старт' : 'Стоп'} />
          </>
        )}
      </Timer>
      <Menu/>
    </>
  )
}