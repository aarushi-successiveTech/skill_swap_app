'use client';
import { createContext, useState, useEffect, useContext } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const [hasUnread, setHasUnread] = useState(false);

    const checkUnreadNotifications = async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return;

        try {
            const res = await fetch("http://localhost:5000/getCount", {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            const data = await res.json();
            if (res.ok) {
                setHasUnread(data.count > 0);
            }
        } catch (error) {
            console.error("Failed to check for unread notifications:", error);
        }
    };

    const markAllAsRead = async () => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) return;
        try {
            await fetch("http://localhost:5000/markRead", {
                method: "POST",
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setHasUnread(false);
        } catch (error) {
            console.error("Failed to mark notifications as read:", error);
        }
    };

    useEffect(() => {
        checkUnreadNotifications();
    }, []);

    return (
        <NotificationContext.Provider value={{ hasUnread, checkUnreadNotifications, markAllAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === null) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};