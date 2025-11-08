import { useState } from "react";
import { authApi } from "../api/authApi";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const user = await authApi.login(email, password);
            setUser(user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const register = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            const user = await authApi.register(email, password);
            setUser(user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }    

    const logout = async (email) => {
        setLoading(true);
        setError(null);

        try {
            await authApi.logout(email);
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return { user, login, register, logout, loading, error };

}