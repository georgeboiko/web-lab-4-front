import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../features/auth/model/authSlice";

export const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/auth");
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.navItem} onClick={() => navigate("/points")}>
                Points
            </div>
            <div className={styles.navItem} onClick={() => navigate("/profile")}>
                Profile
            </div>
            <div className={styles.toLogout} onClick={handleLogout} >
                Log Out
            </div>
        </div>
    );
};