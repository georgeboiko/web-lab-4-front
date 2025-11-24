import EditEmailForm from "../../features/editEmail/ui/EditEmailForm";
import EditPasswordForm from "../../features/editPassword/ui/EditPasswordForm";
import { Navbar } from "../../widgets/navbar/ui/Navbar";
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    return (
        <div>
            <Navbar/>
            <div className={styles.container}>
                <EditEmailForm/>
                <EditPasswordForm/>
            </div>
        </div>
    );
};

export default ProfilePage;