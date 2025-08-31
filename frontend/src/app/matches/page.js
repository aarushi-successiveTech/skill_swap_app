"use client"; 

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MatchingPage(){

    const [user, setUser] = useState(null); 
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState(""); 
    const router = useRouter(); 

    useEffect(() => {
        const fetchedMatches = async() => {
            const token = localStorage.getItem("token"); 
            if(!token){
                router.push("/auth/login"); 
                return; 
            }
            try{
                const userRes = await fetch("http://localhost:5000/getUser", {
                    headers: {Authorization: `Bearer ${token}`}, 
                });

                const userData = await userRes.json(); 
                if(!userRes.ok) throw new Error(userData.message); 

                setUser(userData.fetchedUser); 

                const matchRes = await fetch("http://localhost:5000/getMatch", {
                    headers: {Authorization: `Bearer ${token}`}, 
                }); 

                const matchData = await matchRes.json(); 
                if(!matchRes.ok) throw new Error(matchData.message); 

                setMatches(matchData.matches); 
            }
            catch(error){
                setError(error.message || "fetching could not happen"); 
            }
        }; 
        fetchedMatches(); 

    }, [router]); 

    const sendSwapRequest = async(match) => {
        const token = localStorage.getItem("token");
        try{
            const res = await fetch("http://localhost:5000/createSwap", {
                method:"POST", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }, 
                body: JSON.stringify({
                    toUser: match._id, 
                    skillOffered: user.skillOffered[0], 
                    skillRequested: match.skillOffered[0], 
                }),
            });
            
            const data = await res.json(); 
            if(!res.ok) throw new Error(data.message); 
            alert('swap request sent!'); 
        }
        catch(error){
            alert(error.message); 
        }
    }; 
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!user) return <div className="p-4">Loading...</div>;
    
  return (
    <div className="max-w-2xl mx-auto p-6 bg-black rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Matching Users</h1>
      {matches.length === 0 ? (
        <p>No matches found yet.</p>
      ) : (
        <ul className="space-y-4">
          {matches.map((match) => (
            <li
              key={match._id}
              className="p-4 border rounded-md bg-grey-50 flex justify-between"
            >
              <div>
                <p className="font-semibold">{match.name}</p>
                <p>Email: {match.email}</p>
                <p>Skills Offered: {match.skillOffered.join(", ")}</p>
                <p>Skills Wanted: {match.skillWanted.join(", ")}</p>
              </div>
              <button
                onClick={() => sendSwapRequest(match)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Send Request
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

