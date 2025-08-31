"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import MatchCard from "@/components/matchCard";

export default function Dashboard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [matches, setMatches] = useState([]);
  const [swaps, setSwaps] = useState([]); 
  const [token, setToken] = useState(null); 
  const [loggedId, setLoggedIn] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/auth/login");
    } else {
      setLoggedIn(storedToken._id); 
      setToken(storedToken); 
      fetchMatches(storedToken);
      fetchSwaps(storedToken); 
    }
  }, [router]);

  const fetchMatches = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/getMatch", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setMatches(data.matches);
      else console.log("error fetching matches", data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSwaps = async(token) => {
    try{
      const res = await fetch("http://localhost:5000/getSwap", {
        headers: {Authorization: `Bearer ${token}`}, 
      });
      const data = await res.json(); 
      console.log(data); 
      if(res.ok){
        setSwaps(data.swaps);
      }
      else console.log('error updating swaps', data.message); 
    }
    catch(error){
      console.log(error); 
    }
  }; 

  const requestSwap = async(receiverId, skillRequested, skillOffered) => {
    if(!token) return ; 
    try{
      const res = await fetch("http://localhost:5000/createSwap", {
        method: "POST", 
        headers: {
          "content-type": "application/json", 
          Authorization: `Bearer ${token}`, 
        }, 
        body: JSON.stringify({toUser: receiverId, skillRequested: skillRequested.join(", "), skillOffered: skillOffered.join(", ")}), 
      }); 
      const data = await res.json(); 
      if(!res.ok){
        alert('ohh!! bsomething went wrong! Try again later', data.message); 
      }
      else{
        alert('wohoo!! swap request sent successfully'); 
        fetchSwaps(token); 
      }
    }
    catch(error){
      console.log(error); 
    }
  };


  const matchesWithStatus = matches.map((m) => { 
    const requestSent = swaps.some(
      (s) => (s.fromUser._id === loggedId || s.toUser._id === m._id) 
    ); 

    const requestReceived = swaps.some(
      (s) => (s.fromUser._id === m._id || s.toUser._id === loggedId)
    ); 

    return {
      ...m, 
      requestSent: requestSent, 
      requestReceived: requestReceived
    }; 
      });


  const swapStats = {
    pending: swaps.filter((s) => s.status === "pending").length,
    accepted: swaps.filter((s) => s.status === "accepted").length, 
    rejected: swaps.filter((s) => s.status === "rejected").length

  }; 
  console.log("swaps:", swaps); 
  console.log("swap status: ", swapStats); 
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-10 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-100 text-yellow-800 p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-bold">{swapStats.pending}</h2>
            <p className="text-sm">Pending Requests</p>
          </div>

          <div className="bg-green-100 text-green-800 p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-bold">{swapStats.accepted}</h2>
            <p className="text-sm">Accepted Swaps</p>
          </div>

          <div className="bg-red-100 text-red-800 p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-bold">{swapStats.rejected}</h2>
            <p className="text-sm">Rejected Requests</p>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Your Potential Matches
        </h1>

        {matches.length === 0 ? (
          <p className="text-gray-600">
            No matches found yet. Keep exploring 🚀
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchesWithStatus.map((match) => (
              <MatchCard
                key={match._id}
                match={match}
                requestSwap={requestSwap}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
