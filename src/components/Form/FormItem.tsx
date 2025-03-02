import classNames from 'classnames';
import styles from './FormItem.module.css';

export const byType = {
  push: ({ onChange, options = [], value = [] }) => {
    const hash = options.reduce((acc, item) => ({ ...acc, [item.value]: item.name }), {});

    return (
      <>
        <div className={styles.selected}>
          {value.length ? value.map((item, i) => (
            <div
              className={classNames(styles.optionItem)}
              key={item + '-' + i}
              onClick={() => { value.splice(i, 1); onChange([...value]) }}
            >
              {hash[item]}
            </div>
          )) : 'Заполните ряд'}
        </div>
        <div className={styles.options}>
          {options.map((item, i) => (
            <div
              key={item.value + '-' + i}
              className={classNames(styles.optionItem)}
              onClick={() => onChange([...value, item.value])}
              children={item.name}
            />
          ))}
        </div>
      </>
    );
  },
  number: ({ onChange, ...other }) => <input type="number" onChange={e => onChange(e.target.value)} {...other} />,
  switch: ({ onChange, options = [], value }) => (
    <div className={styles.options}>
      {options.map(item => (
        <div
          className={classNames(styles.option, item.value === value && styles.active)}
          onClick={() => onChange(item.value)}
          children={item.name}
        />
      ))}
    </div>
  )
}

export const FormItem = ({ value, label, type, onChange, ...other }) => {
  const Control = byType[type];
  return (
    <label className={styles.root}>
      <div className={styles.label}>{label}</div>
      <Control value={value} className={styles.input} onChange={onChange} {...other} />
    </label>
  )
}