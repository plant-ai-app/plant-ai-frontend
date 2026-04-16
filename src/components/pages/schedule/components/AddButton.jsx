import React from 'react';
import styles from './AddButton.module.css';
import { BsPlus } from 'react-icons/bs';

const AddButton = ({ onClick }) => {
    return (
        <button className={styles.fab} onClick={onClick} aria-label="Adicionar nova tarefa">
            <BsPlus size={36} />
        </button>
    );
};

export default AddButton;
