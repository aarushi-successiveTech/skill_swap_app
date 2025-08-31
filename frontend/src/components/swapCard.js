export default function SwapList({ title, swaps, type, onRespond }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-6 w-full">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {swaps.length === 0 ? (
        <p className="text-gray-500">No {type} swap requests yet.</p>
      ) : (
        <div className="flex space-x-4 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {swaps.map((swap) => (
            <div
              key={swap._id}
              className="flex-none w-64 md:w-72 border rounded-xl p-4 flex flex-col space-y-1 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {type === "sent" ? (
                <>
                  <p>
                    <span className="font-semibold">To:</span>{" "}
                    {swap.toUser?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {swap.toUser?.email}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <span className="font-semibold">From:</span>{" "}
                    {swap.fromUser?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {swap.fromUser?.email}
                  </p>
                </>
              )}

              <p>
                <span className="font-semibold">Skills Offered:</span>{" "}
                {swap.skillOffered}
              </p>
              <p>
                <span className="font-semibold">Skills Requested:</span>{" "}
                {swap.skillRequested}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    swap.status === "pending"
                      ? "text-yellow-600"
                      : swap.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-medium`}
                >
                  {swap.status}
                </span>
              </p>
              
              {type === "received" && swap.status === "pending" && (
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => onRespond(swap._id, "accepted")} 
                    className="px-3 py-1 bg-green-600 text-white rounded-md"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => onRespond(swap._id, "rejected")} 
                    className="px-3 py-1 bg-red-600 text-white rounded-md"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}