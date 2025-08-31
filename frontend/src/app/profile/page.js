'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/profileCard";
import { SkillsOfferedCard, SkillsWantedCard } from "@/components/skillsCard";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState("offered"); 
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:5000/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to fetch user");
          return;
        }
        setUser(data.fetchedUser);
      } catch (err) {
        setError("Something went wrong");
      }
    };

    fetchUser();
  }, [router]);

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    const token = localStorage.getItem("token");
    const updatedData =
      skillType === "offered"
        ? { skillOffered: [...(user.skillOffered || []), newSkill] }
        : { skillWanted: [...(user.skillWanted || []), newSkill] };

    try {
      const res = await fetch("http://localhost:5000/updateUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setUser(data.user); 
      setNewSkill("");
      setSkillType("offered");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/deleteUser", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      localStorage.removeItem("token");
      router.push("/auth/register");
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="flex justify-center items-start p-10">
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md border">

      <div className="mb-8 ">
        <ProfileCard name={user.name} email={user.email} />
      </div>

      <div className="mb-8 flex flex justify-between items-start gap-4">
          <SkillsOfferedCard skills={user.skillOffered} />
          <SkillsWantedCard skills={user.skillWanted} />

      </div>

      <div>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add Skill
          </button>
          <button
            onClick={handleDeleteProfile}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Delete Profile
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-bold">Add New Skill</h2>
            <input
              type="text"
              placeholder="Enter skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <select
              value={skillType}
              onChange={(e) => setSkillType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="offered">Skill Offered</option>
              <option value="wanted">Skill Wanted</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}