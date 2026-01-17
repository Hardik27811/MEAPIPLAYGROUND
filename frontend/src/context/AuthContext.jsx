import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const checkAuth = async () => {
    try {
        const response = await api.get('/auth/me');
        if (response.status === 200) {
            setUser(response.data.user);
            setIsAuthenticated(true);
        }
    } catch (error) {
        // If 401, we just set authenticated to false and move on
        setIsAuthenticated(false);
        setUser(null);
    } finally {
        setLoading(false); // This MUST run so ProtectedRoutes knows it's done
    }
};
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);