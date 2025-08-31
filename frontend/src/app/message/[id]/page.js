'use client'
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function MessagePage() {
  const router = useRouter();
  const params = useParams();
  const otherUserId = params.id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggedId, setLoggedId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/auth/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(storedToken);
      const userId = decodedToken._id;
      setLoggedId(userId);

      const fetchChatHistory = async () => {
        if (!otherUserId) {
          setLoading(false);
          return;
        }

        try {
          const res = await fetch(`http://localhost:5000/chatHistory/${otherUserId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          const data = await res.json();
          if (res.ok) {
            setMessages(data);
          } else {
            console.error("Error fetching chat history", data.error);
          }
        } catch (error) {
          console.error("Error fetching chat history:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchChatHistory();
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  }, [otherUserId, router]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !loggedId) return;

    const storedToken = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/sendChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ toUser: otherUserId, message: newMessage }),
      });

      if (res.ok) {
        const sentMessage = await res.json();
        setMessages((prevMessages) => [...prevMessages, sentMessage]);
        setNewMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) {
    return <p className="p-6">Loading chat...</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Chat with {messages[0]?.toUser.name || "User"}</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500">Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.fromUser === loggedId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                  msg.fromUser === loggedId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                <p>{msg.message}</p>
                <span className="text-xs text-right block mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSendMessage} className="bg-white p-4 flex items-center shadow-inner">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus-ring-blue-500"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}