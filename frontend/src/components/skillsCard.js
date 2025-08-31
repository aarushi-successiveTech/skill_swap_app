export function SkillsOfferedCard({ skills }) {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-lg font-bold mb-2">Skills Offered</h2>
      {skills.length === 0 ? (
        <p>No skills offered yet.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SkillsWantedCard({ skills }) {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-lg font-bold mb-2">Skills Wanted</h2>
      {skills.length === 0 ? (
        <p>No skills requested yet.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
