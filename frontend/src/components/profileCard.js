export default function ProfileCard({ name, email }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md ">
      <h1 className="text-xl font-bold mb-2">Profile</h1>
      <p>
        <span className="font-semibold">Name:</span> {name}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {email}
      </p>
    </div>
  );
}
