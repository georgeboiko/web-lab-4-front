import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, logoutUser } from './authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    return {
        user,
        loading,
        error,
        login: (email, password) => dispatch(loginUser({ email, password })),
        register: (email, password) => dispatch(registerUser({ email, password })),
        logout: () => dispatch(logoutUser()),
    };
};