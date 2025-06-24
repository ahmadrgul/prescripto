import { createContext, useContext } from "react";
import { useState } from "react";
import { getUserData } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const [ loading, setLoading ] = useState(false);

    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        setUser(null);
    }

    const login = async ({ access, refresh}) => {
        setLoading(true);

        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        
        try {
            const userData = await getUserData();
    
            if (userData) {
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
