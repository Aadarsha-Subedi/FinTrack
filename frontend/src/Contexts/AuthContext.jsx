// src/Contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../Utils/url';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        async function verifyAuth() {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${url}/verify`,
                    withCredentials: true
                });
                setIsAuthenticated(response.data.loggedIn);
            } catch (error) {
                setIsAuthenticated(false);
            }
        }
        verifyAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
