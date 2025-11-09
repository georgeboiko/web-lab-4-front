import { useDispatch } from "react-redux";
import { fetchUser } from "../../features/auth/model/authSlice";
import { useEffect } from "react";
import { useState } from "react";

export const SessionProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await dispatch(fetchUser()).unwrap();
            } catch (err) {
                console.log(err.message || 'User not authenticated');
            } finally {
                setIsInitialized(true);
            }
        };

        initializeAuth();
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <div>Loading...</div>
        );
    }

    return children;
};