import React from 'react';
import styles from './Container.module.css';

const Container = ({ children, padding, alignItems, justifyContent }) => {
    return (
        <div className={styles.container}
            style={
                {
                    padding: padding || '24% 1.2rem 1.5rem 1.2rem',
                    alignItems: alignItems || 'undefined',
                    justifyContent: justifyContent || 'undefined'
                }
            }>
            {children}
        </div>
    );
};

export default Container;
