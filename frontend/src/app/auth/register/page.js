"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  
  //form variables
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    skillOffered: "",
    skillWanted: "",
  });
  const [error, setError] = useState("");

  //form functions 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //fetching from backend
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          skillOffered: form.skillOffered.split(",").map((s) => s.trim()),
          skillWanted: form.skillWanted.split(",").map((s) => s.trim()),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Yay! Registration successful!");
      router.push("/auth/login");
    } catch (err) {
      console.log(err); 
      setError("Something went wrong. Try again.");
    }
  };

  //main frontend 
  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Register</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white text-black placeholder-gray-400"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white text-black placeholder-gray-400"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white text-black placeholder-gray-400"
          required
        />
        <input
          name="skillOffered"
          type="text"
          placeholder="Skills you offer"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white text-black placeholder-gray-400"
        />
        <input
          name="skillWanted"
          type="text"
          placeholder="Skills you want"
          onChange={handleChange}
          className="w-full p-2 border rounded bg-white text-black placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
