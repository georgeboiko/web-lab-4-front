import { useState } from "react";
import { useAuth } from "../model/useAuth"

export const AuthForm = () => {
    const {user, login, register, logout, loading, error} = useAuth();
    const [mode, setMode] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (user) {
        return (
            <div>
                <div>
                    здарова братан, {user.email}
                </div>
                <div>
                    <button onClick={logout}> ливнуть </button>
                </div>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        mode === 'login' ? login(email, password) : register(email, password);
    };

    return (
        <div>
            <div>
                {mode}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div> {error} </div>}
                <button disabled={loading} type="submit">
                    {loading ? 'Гружу (а я грущу) бро...' : (mode === 'login' ? 'войти' : 'регаца')}
                </button>
            </form>
            <div>
                { mode === 'login' ? (
                    <button type="button" onClick={() => setMode('register')}>
                        хочу регнуца
                    </button>
                ) : (
                    <button type="button" onClick={() => setMode('login')}>
                        хочу логиница
                    </button>
                )}
            </div>
        </div>
    );
}