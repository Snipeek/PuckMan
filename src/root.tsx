import { Colors } from './pages/Colors'
import { Numbers } from './pages/Numbers'
import { Lines } from './pages/Lines'
import { Route, Routes } from 'react-router-dom';
import {useState} from 'react';
import {Form, useFrom} from './components/Form/Form';
import {Menu} from './components/Menu/Menu';
import {Button} from './components/Button/Button';
import styles from './pages/style.module.css';
import {Timer, useTimer} from './components/Timer/Timer';
import {shuffleArray} from './helpers';
import {FormItem} from './components/Form/FormItem';
import {Gate, sides} from './components/Gate/Gate';

import './root.css';
import classNames from 'classnames';

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

function generateAngles(n) {
  const angles = [];

  for (let i = 0; i < n; i++) {
    const angle = (360 / n) * i;  // Равномерно распределяем углы на круге
    angles.push(angle);
  }

  return angles;
}

const items = {
  color: generateDistinctColors(10).map(color => ({
    name: <div style={{ height: '2em', width: '2em', background: color}} />,
    value: color,
  })),
  number: (new Array(10).fill(null)).map((_, i) => i + 1).map(i => ({
    name: <div style={{ fontSize: '2em', width: '1em', }}>{i}</div>,
    value: i,
  })),
  line: generateAngles(8).map(deg => ({
    name: <div style={{ height: '1em', fontSize: '2em', width: '1em', transformOrigin: 'center', transform: `rotate(${deg}deg)` }}>
      <svg style={{ height: '100%', width: '100%' }} data-name="1-Arrow Up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"/>
      </svg>
    </div>,
    value: deg,
  })),
  gate: sides.map(name => ({
    name: <div style={{ width: 'fit-content' }}>{name}</div>,
    value: name,
  })),
}

const options = [
  { value: 'color', name: 'Цвета' },
  { value: 'number', name: 'Числа' },
  { value: 'line', name: 'Направления' },
  { value: 'gate', name: 'Ворота' },
]

const optionsSwitch = [
  { value: 'time', name: 'Время' },
  { value: 'click', name: 'Клик' },
]

export const Root = () => {
  const { state, control } = useFrom();
  const [isView, setView] = useState();

  const elems = state[`items-${state.type}`] || [];

  const hash = (items[state.type] || []).reduce((acc, item) => ({ ...acc, [item.value]: item.name }), {});
  
  const isClick = state.type === 'gate' || state.switchBy === 'click';

  const { timer, stop, current, paused, time, onNext, onStart, onStop } = useTimer({ ...state, count: elems.length, isClick });

  const open = control('open', '');

  return (
    <>
      
      <div className={classNames(styles.item, !open.value && styles.full)}>
        {state.type === 'gate' ? (
          <>
            <Gate items={elems} current={current} onNext={onNext} isView={isView}>
              {timer === 0 ? 'Тут будет время' : `${!stop ? 'Таймер' : 'Итого'}: ${timer}сек`}
            </Gate> 
          </>
        ) : (
          isClick ? (
            <div className={styles.fulls} onClick={isClick && onNext}>
              <div style={{ height: '8em', width: '8em', transform: 'scale(3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {!paused && !stop ? hash[elems[current]] : null}
              </div>

              {timer === 0 ? 'Тут будет время' : `${!stop ? 'Таймер' : 'Итого'}: ${timer}сек`}
            </div>
          ) : (
            <div className={styles.fulls}>
              <div style={{ height: '8em', width: '8em', transform: 'scale(3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {!paused && !stop ? hash[elems[current]] : null}
              </div>

              {stop && 'Тут будет значение'}
              {paused && `Пауза: ${time}`}
              {!paused && !stop && `${time}`}
            </div>
          )
        )}
    
      </div>

      {open.value && (
        <>
          <FormItem {...control('type', 'Тип')} options={options} type='switch' />
          <FormItem {...control(`items-${state.type}`, 'Набор')} options={items[state.type]} type='push' />

          {state.type === 'gate' ? (
            <>
              <Button onClick={() => setView(prev => !prev)} children={!isView ? 'Показать' : 'Скрыть'} />
            </>
          ) : (
            <>
              <FormItem {...control('switchBy', 'Переключение по')} options={optionsSwitch} type='switch' />
              {!isClick && (
                <>
                  <FormItem {...control('timeFrom', 'Время от')} type='number' />
                  <FormItem {...control('timeTo', 'Время до')} type='number' />
                  <FormItem {...control('pause', 'Пауза')} type='number' />
                </>
              )}
            </>
          )}
        </>
      )}
      
      <div className={styles.btn}>
        <Button onClick={stop ? onStart : onStop} children={stop ? 'Старт' : 'Стоп'} />
        <Button onClick={() => open.onChange(!open.value)} children={!open.value ? 'Открыть настройки' : 'Скрыть настройки'} />
      </div>
    </>
  )
}