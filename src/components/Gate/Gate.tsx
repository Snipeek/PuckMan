import React, { useState } from 'react';
import styles from './Gate.module.css';
import classNames from 'classnames';

export const sides = [
    'TopLeft',
    'TopCenter',
    'TopRight',
    'CenterLeft',
    'CenterRight',
    'BottomLeft',    
    'BottomCenter',
    'BottomRight',
]


export const Gate = ({ items = [], children, isView, onNext, current }) => {
    const [{ pos, state }, setState] = useState({});

    const cur = items[current];

    const get = (name) => {
        const index = items.findIndex(item => item === name);

        if (index === -1) return '';

        return index + 1;
    }

    return (
        <div className={styles.root}>
             {sides.map(name => (
                <div
                    onClick={() => {
                        if (!cur) return;

                        if (cur === name) {
                            setState({ pos: name, state: 'success' });
                            onNext();
                        } else {
                            setState({ pos: name, state: 'error' });
                        }

                        setTimeout(() => { setState({}); }, 2 * 1000)
                    }}
                    className={classNames(styles[name], pos === name && styles[state])}
                >
                    {isView ? get(name) : name}
                </div>
             ))}
             <div className={styles.center}>
                 {children}
             </div>
        </div>
    );
}