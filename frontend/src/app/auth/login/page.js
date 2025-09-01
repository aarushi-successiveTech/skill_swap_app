"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/loginForm"; 
import { useAuth } from '../../../context/authContext'; 

export default function LoginPage() {
  const { login } = useAuth(); 
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
      login(data.token);
    } catch {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <LoginForm
      form={form}
      error={error}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}