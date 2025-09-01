'use client';
import Link from "next/link";
import { AuthProvider, useAuth } from '../context/authContext';
import { NotificationProvider, useNotifications } from "../context/notificationContext";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function ClientLayoutWrapper({ children }) {
  return (
    <NotificationProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </NotificationProvider>
  );
}

function AuthWrapper({ children }) {
  const { checkUnreadNotifications } = useNotifications();
  return (
    <AuthProvider checkUnread={checkUnreadNotifications}>
      <AppContent>{children}</AppContent>
    </AuthProvider>
  );
}

function AppContent({ children }) {
  const { isLoggedIn } = useAuth();
  
  return (
    <>
      <nav className="w-full p-4 bg-black text-white flex justify-between items-center">
        <h1 className="font-bold flex">Skill Swap</h1>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">Dashboard</Link>
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Register
            </Link>
          )}
        </div>
      </nav>
      <main className="p-6 flex-grow">{children}</main>
      <footer className="w-full p-4 bg-black text-white text-center">
        <p>&copy; 2025 Skill Swap</p>
      </footer>
    </>
  );
}