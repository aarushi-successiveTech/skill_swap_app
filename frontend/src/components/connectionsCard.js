"use client";
export default function ConnectionCard({ user, onChat }) {
  return (
    <div className="p-4 bg-white shadow rounded-2xl flex justify-between items-center">
      <div>
        <h2 className="font-semibold text-lg">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
      <button
        onClick={() => onChat(user.id)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Chat
      </button>
    </div>
  );
}
