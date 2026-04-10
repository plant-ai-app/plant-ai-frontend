//styles
import styles from "./Perfil.module.css";

//components
import Container from "../../common/container/Container.jsx";
import ProfileHeader from "./components/ProfileHeader.jsx";
import ProfileInfo from "./components/ProfileInfo.jsx";
import ProfileStats from "./components/ProfileStats.jsx";
import SettingsList from "./components/SettingsList.jsx";
import AccountList from "./components/AccountList.jsx";

const Perfil = () => {
    return (
        <Container padding={'0'}>
            <div className={styles.scrollArea}>
                <ProfileHeader />
                <ProfileInfo />
                <ProfileStats />
                <SettingsList />
                <AccountList /> 
            </div>
        </Container>
    );
};

export default Perfil;