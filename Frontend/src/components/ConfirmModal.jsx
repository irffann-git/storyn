import { FaExclamationTriangle, FaTimes, FaCheck } from "react-icons/fa";

function ConfirmModal({ message, onConfirm, onCancel, title = "Confirm" }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 border border-[#EDE4CB] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#EDE4CB] flex items-center justify-center text-[#37400B]">
            <FaExclamationTriangle className="w-7 h-7" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold text-[#37400B] mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-center text-[#6B5D4F] text-sm leading-relaxed mb-6">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-[#EDE4CB] text-[#6B5D4F] hover:bg-[#EDE4CB] hover:text-[#37400B] transition font-semibold text-sm flex items-center justify-center gap-2"
          >
            <FaTimes className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FaCheck className="w-4 h-4" />
            Confirm
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-up {
          animation: scale-up 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ConfirmModal;