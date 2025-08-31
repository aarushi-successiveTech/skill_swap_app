"use client"; 
export default function MatchCard({ match, requestSwap }) {
  const getButtonText = () => {
    if (match.requestReceived) {
      return "Request Received";
    }
    if (match.requestSent) {
      return "Request Sent";
    }
    return "Send Request";
  };

  const isButtonDisabled = match.requestSent || match.requestReceived; 

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{match.name}</h2>
      <p className="text-gray-600">📧 {match.email}</p>
      <p className="mt-2">
        <span className="font-semibold">Offers:</span> {match.skillOffered.join(", ")}
      </p>
      <p>
        <span className="font-semibold">Wants:</span> {match.skillWanted.join(", ")}
      </p>

      <button
        onClick={() => requestSwap(match._id, match.skillWanted, match.skillOffered)}
        disabled={isButtonDisabled}
        className={`mt-4 w-full px-4 py-2 rounded transition
          ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`
        }
      >
        {getButtonText()}
      </button>
    </div>
  );
}