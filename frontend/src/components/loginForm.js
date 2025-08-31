import Link from "next/link";
import "./loginForm.css"; 

export default function LoginForm({ form, error, handleChange, handleSubmit }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="text-center mb-8">
        <h1 className="animated-text font-extrabold text-7xl text-blue-600">
          SkillSwap
        </h1>
      </div>

      <div className="max-w-md w-full bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Login</h1>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            className="w-full p-2 border rounded bg-white text-black placeholder-gray-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            className="w-full p-2 border rounded bg-white text-black placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Not a registered user?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}