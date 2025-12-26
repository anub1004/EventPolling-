import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import PollVoting from '../Polls/PollVoting';
import PollResults from '../Polls/PollResults';
import Loading from '../Common/Loading';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  // 🔹 Fetch event safely
  const fetchEvent = async () => {
    try {
      const res = await eventAPI.getById(id);

      // ✅ SUPPORT ALL BACKEND RESPONSE SHAPES
      const eventData = res?.data?.data || res?.data?.event || res?.data;
      setEvent(eventData);
    } catch (err) {
      console.error('Failed to fetch event', err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventAPI.delete(id);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete event');
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      await eventAPI.invite(id, inviteEmail);
      setInviteMessage('Invitation sent successfully!');
      setInviteEmail('');
      setTimeout(() => setInviteMessage(''), 3000);
    } catch (err) {
      setInviteMessage(err.response?.data?.message || 'Failed to send invitation');
    }
  };

  if (loading) return <Loading />;

  if (!event) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
        <p className="text-gray-600 mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 shadow-lg"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  // ✅ HANDLE creator / createdBy mismatch
  const creator = event.creator || event.createdBy;
  const isCreator = creator?._id === user?._id;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex gap-4 flex-wrap">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${
              event.status === 'active'
                ? 'bg-green-500'
                : 'bg-gray-500'
            }`}>
              {event.status}
            </span>

            {isCreator && (
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-500 text-white">
                👑 You're the creator
              </span>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border rounded-xl"
            >
              ← Back
            </button>

            {isCreator && (
              <>
                <button
                  onClick={() => navigate(`/events/${id}/edit`)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl"
                >
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="bg-white/70 rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-700 mb-6">{event.description}</p>

        <div className="bg-blue-50 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-2">👤 Event Creator</h2>
          <p>{creator?.name}</p>
          <p className="text-gray-600">{creator?.email}</p>
        </div>
      </div>

      {/* Date Options */}
      <div className="bg-white/70 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4">📅 Date Options</h2>
        {event.dateOptions?.map((opt, i) => (
          <div key={i} className="bg-blue-50 rounded-xl p-4 mb-2">
            {formatDate(opt.date)} at {opt.time}
          </div>
        ))}
      </div>

      {/* Participants */}
      <div className="bg-white/70 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-4">
          👥 Participants ({event.participants?.length || 0})
        </h2>

        {event.participants?.map((p) => (
          <div key={p.user._id} className="flex items-center gap-3 bg-green-50 p-3 rounded-xl mb-2">
            <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
              {p.user.name.charAt(0)}
            </div>
            {p.user.name}
          </div>
        ))}
      </div>

      {/* Invite */}
      {isCreator && (
        <div className="bg-white/70 rounded-2xl shadow-xl p-8">
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="w-full bg-blue-500 text-white py-3 rounded-xl mb-4"
          >
            {showInvite ? 'Hide Invite' : 'Invite Participants'}
          </button>

          {showInvite && (
            <form onSubmit={handleInvite} className="space-y-4">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-xl"
                placeholder="Enter email"
              />
              {inviteMessage && (
                <p className={inviteMessage.includes('success') ? 'text-green-600' : 'text-red-600'}>
                  {inviteMessage}
                </p>
              )}
              <button className="w-full bg-green-500 text-white py-3 rounded-xl">
                Send Invitation
              </button>
            </form>
          )}
        </div>
      )}

      {/* Poll */}
      {event.poll && (
        <>
          <div className="bg-white/70 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4">🗳️ Vote</h2>
            <PollVoting event={event} />
          </div>

          <div className="bg-white/70 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4">📊 Results</h2>
            <PollResults event={event} />
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;

