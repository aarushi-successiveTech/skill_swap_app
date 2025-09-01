'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/components/UserCard";

export default function CommunityPage() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    const limit = 4; 

    const fetchUsers = async (page) => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/getAll?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch users');
            }
            setUsers(data.users);
            setTotalPages(data.pages);
            setCurrentPage(data.page);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage, router]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <div className="p-6 text-center text-lg">Loading users...</div>;
    if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
    if (users.length === 0) return <div className="p-6 text-center text-gray-500">No users found.</div>;

    return (
        <div className="p-6 container mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-center text-blue-900">SkillSwap Members</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {users.map(user => (
                    <UserCard key={user._id} user={user} />
                ))}
            </div>
            
            <div className="mt-10 flex justify-center items-center space-x-4">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>
                <span className="text-lg font-medium text-gray-800">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                </button>
            </div>
        </div>
    );
}