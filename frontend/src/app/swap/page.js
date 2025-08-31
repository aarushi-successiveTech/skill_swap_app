"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SwapList from "@/components/swapCard";

export default function SwapPage() {
  const [user, setUser] = useState(null);
  const [sentSwaps, setSentSwaps] = useState([]);
  const [receivedSwaps, setReceivedSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchSwaps(); 
  }, [router]);

  const fetchSwaps = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const userRes = await fetch("http://localhost:5000/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await userRes.json();
      if (!userRes.ok) throw new Error(userData.message);

      setUser(userData.fetchedUser);

      const res = await fetch("http://localhost:5000/getSwap", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const sent = data.swaps.filter(
        (swap) => swap.fromUser._id === userData.fetchedUser._id
      );
      const received = data.swaps.filter(
        (swap) => swap.toUser._id === userData.fetchedUser._id
      );

      setSentSwaps(sent);
      setReceivedSwaps(received);
    } catch (err) {
      console.error("Error fetching swaps:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (swapId, status) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/respondSwap", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ swapId, status }), 
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setReceivedSwaps((prev) =>
        prev.map((swap) =>
          swap._id === swapId ? { ...swap, status: data.swap.status } : swap
        )
      );
    } catch (err) {
      console.error("Error responding to swap:", err);
    }
  };

  if (loading) return <p className="p-4">Loading swaps...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">My Swaps</h1>
      <SwapList title="Swap Requests Sent" swaps={sentSwaps} type="sent" />
      <SwapList
        title="Swap Requests Received"
        swaps={receivedSwaps}
        type="received"
        onRespond={handleRespond} 
      />
    </div>
  );
}