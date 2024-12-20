import { useMemo } from 'react';
import {Form, useFrom} from "../components/Form/Form";
import {Menu} from "../components/Menu/Menu";
import {Button} from "../components/Button/Button";
import styles from "./style.module.css";
import {Timer} from "../components/Timer/Timer";
import {shuffleArray} from "../helpers";

export const Numbers = () => {
  const { state, ...other } = useFrom();

  const items = useMemo(() => (
    shuffleArray(
      (new Array(+state.count || 0)).fill(null).map((_, i) => i +1)
    )
  ), [state.count]);

  return (
    <>
      <Form {...other} />
      <Timer {...state}>
        {({ stop, current, paused, time, onStart, onStop }) => (
          <>
            <div className={styles.item}>
              {stop && 'Тут будет число'}
              {paused && `Пауза: ${time}`}
              {!paused && !stop && <div style={{ fontSize: '5em' }}>{items[current]}</div>}
              {!paused && !stop && `${time}`}
            </div>
            <div className={styles.preview}>
              {items.map((i) => (
                <div>{i}</div>
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