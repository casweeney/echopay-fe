"use client";

export default function SessionExpiredModal() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white z-[9999] p-6 rounded-xl max-w-sm w-full text-center shadow-xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Session Expired
        </h2>

        <p className="text-gray-600 mb-6">
          Your session has expired. Please log in again.
        </p>
      </div>
    </div>
  );
}
