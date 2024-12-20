import { useLocation } from 'react-router-dom';
import {menu} from "../../root";
import cn from 'classnames';
import styles from './Menu.module.css'
import {history} from "../../index";

export const Menu = () => {
  const { pathname } = useLocation();

  const items = Object.entries(menu);

  return (
    <div className={styles.root}>
      {items.map(([path, title]) => (
        <div onClick={() => history.push(`/${path}`)} key={path} className={cn(styles.item, pathname.slice(1) === path && styles.current)}>
          {title}
        </div>
      ))}
    </div>
  )
}
