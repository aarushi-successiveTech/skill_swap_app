'use client';
import React from 'react';

export default function UserCard({ user }) {
  const skillsOffered = user.skillOffered || [];
  const skillsWanted = user.skillWanted || [];
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold text-blue-800">{user.name}</h3>
      <p className="text-gray-600 mt-2">
        <span className="font-medium"></span> {user.email}
      </p>
      <div className="mt-4">
        <h4 className="font-bold text-blue-700">Skills Offered:</h4>
        {skillsOffered.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-600">
            {skillsOffered.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No skills offered yet.</p>
        )}
      </div>
      <div className="mt-4">
        <h4 className="font-bold text-blue-700">Skills Wanted:</h4>
        {skillsWanted.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-gray-600">
            {skillsWanted.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No skills wanted yet.</p>
        )}
      </div>
    </div>
  );
}