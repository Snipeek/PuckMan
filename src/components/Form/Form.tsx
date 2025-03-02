import { useEffect, useState } from 'react';
import {FormItem} from "./FormItem";

const name = 'form';

const local = {
  get: (def) => JSON.parse(localStorage.getItem(name) || JSON.stringify(def)),
  set: (next) => {
    localStorage.setItem(name, JSON.stringify(next))
  },
}

export const useFrom = (def = {}) => {
  const [state, setState] = useState(local.get(def));

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
      <FormItem {...control('timeFrom', 'Время от')} type='number' />
      <FormItem {...control('timeTo', 'Время до')} type='number' />
      <FormItem {...control('pause', 'Пауза')} type='number' />
    </div>
  )
}