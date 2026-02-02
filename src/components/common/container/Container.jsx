import React from 'react';
import styles from './Container.module.css';

const Container = ({ children, padding }) => {
    return (
        <div className={styles.container} style={{padding: padding ? padding : '24% 1.2rem 1.5rem 1.2rem'}}>
            {children}
        </div>
    );
};

export default Container;
