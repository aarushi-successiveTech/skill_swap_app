"use client";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Sidebar({ isOpen, setIsOpen }) {
  const router = useRouter();
  return (
    <aside
      className={`${
        isOpen ? "w-60" : "w-20"
      } bg-gray-900 text-white flex flex-col p-4 transition-all duration-200`}
    >
      <div className="flex items-center justify-between mb-8">
        {isOpen && <h2 className="text-2xl font-bold">SkillSwap</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-gray-800"
        >
          <Menu size={24} />
        </button>
      </div>

      <nav className="space-y-4">
        <button
          onClick={() => router.push("/swap")}
          className="w-full flex items-center gap-2 text-left px-4 py-2 rounded hover:bg-gray-700"
        >
          {isOpen && "My Swaps"}
        </button>

        <button
          onClick={() => router.push("/chat")}
          className="w-full flex items-center gap-2 text-left px-4 py-2 rounded hover:bg-gray-700"
        >
          {isOpen && "chats"}
        </button>

        <button
          onClick={() => router.push("/notif")}
          className="w-full flex items-center gap-2 text-left px-4 py-2 rounded hover:bg-gray-700"
        >
          {isOpen && "Notifications"}
        </button>

        <div className="border-t border-gray-700 pt-4 mt-4">
          <button
            onClick={() => router.push("/profile")}
            className="w-full flex items-center gap-2 text-left px-4 py-2 rounded hover:bg-gray-700"
          >
            {isOpen && "My Profile"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/auth/login");
            }}
            className="w-full flex items-center gap-2 text-left px-4 py-2 rounded bg-red-600 hover:bg-red-700 mt-2"
          >
            {isOpen && "Logout"}
          </button>
        </div>
      </nav>
    </aside>
  );
}