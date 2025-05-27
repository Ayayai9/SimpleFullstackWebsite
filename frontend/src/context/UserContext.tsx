import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { userApi, User } from "../services/api";

interface UserContextType {
    users: User[];
    loading: boolean;
    error: string | null;
    refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await userApi.getAllUsers();
            setUsers(data);
        } catch {
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, loading, error, refreshUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUserContext must be used within a UserProvider");
    return ctx;
};