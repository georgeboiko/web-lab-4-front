import { useState } from "react";
import { useAuth } from "../model/useAuth";
import { useDispatch } from 'react-redux';
import { showError, clearError } from '../../../features/error/errorSlice';
import styles from "./AuthForm.module.css";
import CustomButton from "../../../widgets/CustomButton/ui/CustomButton";
import CustomInput from "../../../widgets/CustomInput/CustomInput";

export const AuthForm = () => {
    const dispatch = useDispatch();
    const {user, login, register, logout, loading } = useAuth();
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogout = (e) => {
        e.preventDefault();
        logout(email);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(clearError());
        if (!email || !password) {
            dispatch(showError({
                description: 'Please fill all fields',
                fullText: null
            }));
            
            return;
        }

        mode === 'login' ? login(email, password) : register(email, password);
    };

    if (user) {
        return (
            <div>
                <div>
                    hello, {user.email}
                </div>
                <div>
                    <button onClick={handleLogout}> Logout </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.authFormMain}>
            <div className={styles.formMode}>
                {mode}
            </div>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <CustomInput
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <CustomInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <CustomButton
                    type="submit"
                    disabled={loading}
                    text={loading ? 'Loading...' : (mode === 'login' ? 'Login' : 'Register')}
                />
            </form>
            { mode === 'login' ? (
                <button
                    type="button"
                    onClick={() => setMode('register')}
                    className={styles.changeBtn}
                >
                    No account?
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={styles.changeBtn}
                >
                    Already registred?
                </button>
            )}
        </div>
    );
}