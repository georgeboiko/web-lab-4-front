import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import AuthPage from '../pages/auth/AuthPage';
import PointsPage from '../pages/points/PointsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import { useSelector } from 'react-redux';

export const AppRouter = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <Routes>
            <Route 
                path="/points" 
                element={
                    <ProtectedRoute>
                        <PointsPage />
                    </ProtectedRoute>
                } 
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage/>
                    </ProtectedRoute>
                }
            />

            <Route 
                path="/auth" 
                element={user ? <Navigate to="/points" replace /> : <AuthPage />} 
            />

            <Route path="*" element={<Navigate to={user ? "/points" : "/auth"} replace />} />
        </Routes>
    );
};
