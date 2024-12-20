import styles from './Button.module.css';

export const Button = ({ children, ...other }) => {
  return (
    <div className={styles.root} {...other}>
      {children}
    </div>
  )
}