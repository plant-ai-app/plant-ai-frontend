import React from 'react';
import styles from './SearchBar.module.css';
import { BsSearch } from 'react-icons/bs';

const SearchBar = ({ onSearch }) => {
    return (
        <div className={styles.searchContainer}>
            <BsSearch className={styles.searchIcon} />
            <input 
                type="text" 
                className={styles.searchInput} 
                placeholder="Buscar plantas..."
                onChange={(e) => onSearch && onSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
