import { useEffect, useState } from 'react';
import {FormItem} from "./FormItem";

const name = 'form';

const local = {
  get: () => JSON.parse(localStorage.getItem(name) || '{}'),
  set: (next) => {
    localStorage.setItem(name, JSON.stringify(next))
  },
}

export const useFrom = () => {
  const [state, setState] = useState(local.get());

  useEffect(() => {
    local.set(state);
  }, [state]);

  return {
    state,
    control: (name, label) => ({
      label,
      value: state[name],
      onChange: (next) => setState(prev => ({ ...prev, [name]: next }))
    })
  }
}

export const Form = ({ control }) => {
  return (
    <div>
      <FormItem {...control('count', 'Количество')} type='number' />
      <FormItem {...control('timeFrom', 'Время от')} type='number' />
      <FormItem {...control('timeTo', 'Время до')} type='number' />
      <FormItem {...control('pause', 'Пауза')} type='number' />
    </div>
  )
}