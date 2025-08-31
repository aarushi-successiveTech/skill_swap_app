"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConnectionCard from "@/components/connectionsCard";
import { jwtDecode } from 'jwt-decode';

export default function ChatPage() {
    const [swaps, setSwaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loggedId, setLoggedId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            setLoading(false);
            router.push('/auth/login');
            return;
        }
        try {
            const decodedToken = jwtDecode(storedToken);
            const userId = decodedToken._id; 
            setLoggedId(userId);

            const fetchSwaps = async () => {
                try {
                    const res = await fetch("http://localhost:5000/getSwap", {
                        headers: { Authorization: `Bearer ${storedToken}` }
                    });
                    const data = await res.json();
                    if (res.ok) {
                        const acceptedSwaps = data.swaps.filter(s => s.status === 'accepted');
                        setSwaps(acceptedSwaps);
                    }
                } catch (error) {
                    console.error("Error fetching swaps:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchSwaps();

        } catch (error) {
            console.error("Failed to decode token or token is invalid:", error);
            localStorage.removeItem("token");
            setLoading(false);
            router.push('/auth/login');
        }
    }, [router]);

    if (loading) return <p className="p-6">Loading...</p>;

    const acceptedConnections = swaps.map(s => {
        const otherUser = s.fromUser._id === loggedId ? s.toUser : s.fromUser;
        return {
            id: otherUser._id,
            name: otherUser.name,
            email: otherUser.email
        };
    });

    return (
        <div className="p-6 grid gap-4">
            <h1 className="text-2xl font-bold mb-4">Your Connections</h1>

            {acceptedConnections.length === 0 ? (
                <p className="text-gray-600">No connections yet.</p>
            ) : (
                acceptedConnections.map((user) => (
                    <ConnectionCard
                        key={user.id}
                        user={user}
                        onChat={(id) => router.push(`/message/${id}`)}
                    />
                ))
            )}
        </div>
    );
}