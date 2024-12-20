import { Colors } from './pages/Colors'
import { Numbers } from './pages/Numbers'
import { Lines } from './pages/Lines'
import { Route, Routes } from 'react-router-dom';

import './root.css';

const byType = {
  colors: Colors,
  numbers: Numbers,
  lines: Lines,
}

export const menu = {
  colors: 'Цвета',
  numbers: 'Цифры',
  lines: 'Указатель',
}

export const Root = () => {
  return (
   <>
     <Routes>
       <Route exact path={`/PuckMan/`} element={<Colors />} />
       {Object.entries(byType).map(([path, Component]) => (
         <Route key={path} exact path={`/PuckMan/${path}`} element={<Component />} />
       ))}
     </Routes>
   </>
  )
}