"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) return setError("oh! Please register first");

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Login</h1>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4"> 
        <input name="email" 
        type="email" 
        placeholder="Email" 
        onChange={handleChange} 
        className="w-full p-2 border rounded bg-white text-black placeholder-gray-400" required /> 
        <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        onChange={handleChange} className="w-full p-2 border rounded bg-white text-black placeholder-gray-400" required /> 
        <button 
        type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" > Login </button> </form>
        <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Not a registered user?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>

    </div>
  );
}