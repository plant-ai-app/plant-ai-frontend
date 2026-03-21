import React from 'react';
import PlantCard from './PlantCard.jsx';
import styles from './PlantList.module.css';

const mockPlants = [
    {
        id: '1',
        name: 'Swiss Cheese Plant',
        nickname: 'Monty',
        location: 'Sala',
        waterDays: 7,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
        id: '2',
        name: 'Snake Plant',
        nickname: 'Slytherin',
        location: 'Quarto',
        waterDays: 14,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
        id: '3',
        name: 'Fiddle Leaf Fig',
        nickname: 'Fidello',
        location: 'Escritório',
        waterDays: 5,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200&h=200'
    },
    {
        id: '4',
        name: 'Golden Pothos',
        nickname: 'Goldie',
        location: 'Sala',
        waterDays: 4,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=200&h=200'
    }
];

const PlantList = ({ filterCategory, searchQuery }) => {
    const displayedPlants = mockPlants.filter(p => {
        const matchesCategory = filterCategory && filterCategory !== 'Todas' 
            ? p.location === filterCategory 
            : true;
        const matchesSearch = searchQuery 
            ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) 
            : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <div className={styles.listContainer}>
            {displayedPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
            ))}
            
            <div className={styles.bottomSpacer}></div>
        </div>
    );
};

export default PlantList;
