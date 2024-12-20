import styles from './FormItem.module.css';

export const byType = {
  number: ({ onChange, ...other }) => <input type="number" onChange={e => onChange(e.target.value)} {...other} />
}

export const FormItem = ({ value, label, type, onChange }) => {
  const Control = byType[type]
  return (
    <label className={styles.root}>
      <div className={styles.label}>{label}</div>
      <Control value={value} className={styles.input} onChange={onChange} />
    </label>
  )
}