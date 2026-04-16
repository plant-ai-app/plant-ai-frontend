import React, { useState } from "react";
//styles
import styles from "./MyPlants.module.css";

//components
import Container from "../../common/container/Container.jsx";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CategoryTabs from "./components/CategoryTabs.jsx";
import PlantList from "./components/PlantList.jsx";
import AddButton from "./components/AddButton.jsx";

const MyPlants = () => {
    const [filterCategory, setFilterCategory] = useState("Todas");
    const [searchQuery, setSearchQuery] = useState("");
    // const navigate = useNavigate();

    // const handleAddPlant = () => {
    //     Mock function for adding a plant
    //     alert("Add button clicked");
    // };

    return (
        <Container padding={"0"}>
            <div className={styles.scrollArea}>
                <Header />
                <SearchBar onSearch={setSearchQuery} />
                <CategoryTabs onSelectCategory={setFilterCategory} />
                <PlantList filterCategory={filterCategory} searchQuery={searchQuery} />
            </div>
            {/* <AddButton onClick={() => navigate("/scan")} /> */}
        </Container>
    );
};

export default MyPlants;