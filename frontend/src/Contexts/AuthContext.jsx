// src/Contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../Utils/url';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        async function verifyAuth() {
            console.log('🔍 Checking authentication...');
            try {
                const response = await axios({
                    method: 'GET',
                    url: `${url}/verify`,
                    withCredentials: true
                });
                console.log('✅ Verify response:', response.data); 
                setIsAuthenticated(response.data.loggedIn);
            } catch (error) {
                console.log('❌ Verify failed:', error);
                setIsAuthenticated(false);
            }
        }
        verifyAuth();
    }, []);

    console.log('🔐 Current isAuthenticated:', isAuthenticated);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}
