export default function Invites({ invites, onAccept, onReject }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Event Invites</h1>

      {invites.map((invite) => (
        <div
          key={invite._id}
          className="bg-white rounded-xl shadow p-5 mb-4 flex justify-between items-center"
        >
          <div>
            <h2 className="font-semibold">{invite.event.title}</h2>
            <p className="text-sm text-gray-500">
              Invited by {invite.event.createdBy.name}
            </p>
          </div>

          <div className="space-x-3">
            <button
              onClick={() => onAccept(invite.event._id)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Accept
            </button>
            <button
              onClick={() => onReject(invite.event._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
