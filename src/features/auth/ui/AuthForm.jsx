import { useState } from "react";
import { useAuth } from "../model/useAuth";
import { useSelector, useDispatch } from 'react-redux';
import { showError, clearError } from '../../../features/error/errorSlice';
import styles from "./AuthForm.module.css";

export const AuthForm = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
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
            dispatch(showError('Please fill all fields'));
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
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    className={styles.input}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                    disabled={loading}
                    type="submit"
                    className={styles.submitBtn}
                >
                    {loading ? 'Loading...' : (mode === 'login' ? 'Login' : 'Register')}
                </button>
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