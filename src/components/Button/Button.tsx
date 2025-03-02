import classNames from 'classnames';
import styles from './Button.module.css';

export const Button = ({ children, className, ...other }) => {
  return (
    <div className={classNames(styles.root, className)} {...other}>
      {children}
    </div>
  )
}