import { useMemo } from 'react';
import {Form, useFrom} from "../components/Form/Form";
import {Menu} from "../components/Menu/Menu";
import {Button} from "../components/Button/Button";
import styles from "./style.module.css";
import {Timer} from "../components/Timer/Timer";
import {shuffleArray} from "../helpers";

function generateAngles(n) {
  const angles = [];

  for (let i = 0; i < n; i++) {
    const angle = (360 / n) * i;  // Равномерно распределяем углы на круге
    angles.push(angle);
  }

  return angles;
}

export const Lines = () => {
  const { state, ...other } = useFrom();

  const items = useMemo(() => (
    shuffleArray(generateAngles(+state.count || 0))
  ), [state.count]);

  return (
    <>
      <Form {...other} />
      <Timer {...state}>
        {({ stop, current, paused, time, onStart, onStop }) => (
          <>
            <div className={styles.item}>
              {stop && 'Тут будет указатель'}
              {paused && `Пауза: ${time}`}
              {!paused && !stop && <div style={{ fontSize: '5em', transformOrigin: 'center', transform: `rotate(${items[current]}deg)` }}>{'->'}</div>}
              {!paused && !stop && `${time}`}
            </div>
            <div className={styles.preview}>
              {items.map((deg) => (
                <div>
                  <div style={{ width: 'max-content',transformOrigin: 'center', transform: `rotate(${deg}deg)` }}>{'->'}</div>
                </div>
              ))}
            </div>
            <Button onClick={stop ? onStart : onStop} children={stop ? 'Старт' : 'Стоп'} />
          </>
        )}
      </Timer>
      <Menu />
    </>
  )
}