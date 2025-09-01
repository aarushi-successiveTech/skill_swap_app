'use client'; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotifications } from "../../context/notificationContext";

export default function NotificationPage(){

    const[notifs, setNotifs] = useState([]); 
    const[loading, setLoading] = useState(true);
    const router = useRouter();  
    const { markAllAsRead } = useNotifications();

    useEffect(() => {
        const storedToken = localStorage.getItem("token"); 
        if(!storedToken){
            router.push('/auth/login');
            return; 
        }
        const fetchNotifications = async() => {
            try{
                const res = await fetch("http://localhost:5000/getNotif", {
                    headers: {Authorization: `Bearer ${storedToken}`}, 
                }); 
                const data = await res.json(); 
                if(res.ok){
                    setNotifs(data); 
                    await markAllAsRead();
                }
                else{
                    console.error(data.message);
                }
            }
            catch(error){
                console.log(error); 
            }
            finally{
                setLoading(false); 
            }
        }; 

        fetchNotifications(); 
    }, [router, markAllAsRead]);
    
    if(loading){
        return <p className="p-6">Loading notifications...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>

            {notifs.length === 0 ? (
                <p className="text-gray-600">You have no new notifications.</p>
            ) : (
                <div className="space-y-4">
                    {notifs.map((notif) => (
                        <div key={notif._id} className="bg-white shadow p-4 rounded-xl">
                            <p className="text-gray-800">{notif.message}</p>
                            <span className="text-sm text-gray-500">
                                {new Date(notif.createdAt).toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}