import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaTrashAlt,
  FaEye,
  FaCheckDouble,
  FaUser,
  FaEnvelopeOpen,
  FaEnvelope as FaEnvelopeClosed,
  FaPaperPlane,
  FaReply,
} from "react-icons/fa";
import API from "../../api/axios";
import ConfirmModal from "../../components/ConfirmModal";
import Loader from "../../components/Loader";

function AdminContact() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modal, setModal] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.put(`/contact/${id}/read`);
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, isRead: true } : msg
        )
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const deleteMessage = async (id) => {
    setModal({
      message: "Are you sure you want to delete this message?",
      onConfirm: async () => {
        try {
          await API.delete(`/contact/${id}`);
          setMessages((prev) => prev.filter((msg) => msg._id !== id));
          setModal(null);
        } catch (err) {
          console.error("Failed to delete message", err);
        }
      },
    });
  };

  const viewMessage = async (msg) => {
    setSelectedMessage(msg);
    setReplyText("");
    setSendError("");
    setSendSuccess(false);
    if (!msg.isRead) {
      await markAsRead(msg._id);
    }
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    setSendError("");
    try {
      await API.post(`/contact/${selectedMessage._id}/reply`, {
        replyMessage: replyText,
      });
      setSendSuccess(true);
      setReplyText("");
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === selectedMessage._id
            ? { ...msg, isReplied: true, isRead: true }
            : msg
        )
      );
      setSelectedMessage((prev) => ({ ...prev, isReplied: true, isRead: true }));
    } catch (err) {
      setSendError(err.response?.data?.message || "Failed to send reply. Try again.");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      await fetchMessages();
    };
    loadMessages();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#EDE4CB] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* ─── Header ─── */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#37400B] tracking-tight flex items-center gap-3">
            <FaEnvelope className="text-[#BDB47B]" />
            Contact Messages
          </h1>
          <p className="text-[#BDB47B] text-sm mt-1">
            View and manage all inquiries from your customers.
          </p>
        </div>

        {/* ─── Stats ─── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#EDE4CB]">
            <p className="text-sm text-[#6B5D4F]">Total</p>
            <p className="text-2xl font-bold text-[#37400B]">{messages.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#EDE4CB]">
            <p className="text-sm text-[#6B5D4F]">Unread</p>
            <p className="text-2xl font-bold text-[#37400B]">
              {messages.filter((m) => !m.isRead).length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#EDE4CB]">
            <p className="text-sm text-[#6B5D4F]">Read</p>
            <p className="text-2xl font-bold text-[#37400B]">
              {messages.filter((m) => m.isRead).length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 border border-[#EDE4CB]">
            <p className="text-sm text-[#6B5D4F]">Today</p>
            <p className="text-2xl font-bold text-[#37400B]">
              {
                messages.filter(
                  (m) =>
                    new Date(m.createdAt).toDateString() ===
                    new Date().toDateString()
                ).length
              }
            </p>
          </div>
        </div>

        {/* ─── Messages Table ─── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#EDE4CB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#EDE4CB] text-[#37400B]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Subject</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-[#6B5D4F]/60">
                      No messages yet.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr
                      key={msg._id}
                      className={`border-b border-[#EDE4CB] hover:bg-[#EDE4CB]/20 transition ${
                        !msg.isRead ? "bg-[#EDE4CB]/30" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {msg.isRead ? (
                            <FaEnvelopeOpen className="text-[#BDB47B]" />
                          ) : (
                            <FaEnvelopeClosed className="text-[#37400B]" />
                          )}
                          {msg.isReplied && (
                            <FaReply className="text-green-500 text-xs" title="Replied" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-[#37400B]">
                        {msg.name}
                      </td>
                      <td className="px-4 py-3 text-[#6B5D4F] hidden sm:table-cell">
                        {msg.email}
                      </td>
                      <td className="px-4 py-3 text-[#6B5D4F] hidden md:table-cell">
                        {msg.subject}
                      </td>
                      <td className="px-4 py-3 text-[#6B5D4F]">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewMessage(msg)}
                            className="p-2 text-[#37400B] hover:bg-[#EDE4CB] rounded-lg transition"
                            aria-label="View"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          {!msg.isRead && (
                            <button
                              onClick={() => markAsRead(msg._id)}
                              className="p-2 text-[#BDB47B] hover:bg-[#EDE4CB] rounded-lg transition"
                              aria-label="Mark as read"
                            >
                              <FaCheckDouble className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(msg._id)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition"
                            aria-label="Delete"
                          >
                            <FaTrashAlt className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Message Detail Modal ─── */}
        {selectedMessage && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMessage(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 border border-[#EDE4CB] shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#37400B]">{selectedMessage.subject}</h3>
                  <div className="flex items-center gap-3 text-sm text-[#6B5D4F] mt-1">
                    <span className="flex items-center gap-1">
                      <FaUser className="text-[#BDB47B]" />
                      {selectedMessage.name}
                    </span>
                    <span>•</span>
                    <span>{selectedMessage.email}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-[#6B5D4F] hover:text-[#37400B] p-1"
                >
                  ✕
                </button>
              </div>

              <div className="border-t border-[#EDE4CB] pt-4 mt-2">
                <p className="text-[#4A3F35] leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>

              {/* ─── Reply Form ─── */}
              <div className="mt-6 pt-5 border-t border-[#EDE4CB]">
                <label className="flex items-center gap-2 text-sm font-semibold text-[#37400B] mb-2">
                  <FaReply className="text-[#BDB47B]" />
                  {selectedMessage.isReplied ? "Send Another Reply" : "Reply to this message"}
                </label>
                <textarea
                  rows="4"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write your reply to ${selectedMessage.name}...`}
                  className="w-full px-4 py-3 bg-[#FBF6EC] border border-[#EDE4CB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#37400B] focus:border-transparent transition resize-none text-sm text-[#4A3F35]"
                  disabled={sending}
                />

                {sendError && (
                  <p className="text-red-500 text-sm mt-2">{sendError}</p>
                )}
                {sendSuccess && (
                  <p className="text-green-600 text-sm mt-2 flex items-center gap-1.5">
                    <FaCheckDouble /> Reply sent to {selectedMessage.email}
                  </p>
                )}

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-6 py-2.5 border border-[#EDE4CB] text-[#6B5D4F] rounded-xl hover:bg-[#EDE4CB]/40 transition text-sm font-medium"
                  >
                    Close
                  </button>
                  <button
                    onClick={sendReply}
                    disabled={sending || !replyText.trim()}
                    className={`px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition ${
                      sending || !replyText.trim()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-[#37400B] text-white hover:bg-[#2A3308]"
                    }`}
                  >
                    {sending ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-xs" />
                        Send Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {modal && (
          <ConfirmModal
            message={modal.message}
            onConfirm={modal.onConfirm}
            onCancel={() => setModal(null)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminContact;