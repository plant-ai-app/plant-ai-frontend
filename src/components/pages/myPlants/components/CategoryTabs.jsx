import React, { useState } from 'react';
import styles from './CategoryTabs.module.css';

const categories = ['Todas', 'Quarto', 'Sala', 'Cozinha', 'Banheiro', 'Escritório', 'Jardim', 'Varanda', 'Quintal', 'Nenhum'];

const CategoryTabs = ({ onSelectCategory }) => {
    const [activeCategory, setActiveCategory] = useState('Todas');

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        if (onSelectCategory) {
            onSelectCategory(category);
        }
    };

    return (
        <div className={styles.tabsContainer}>
            {categories.map((category) => (
                <button
                    key={category}
                    className={`${styles.tab} ${activeCategory === category ? styles.activeTab : ''}`}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryTabs;
