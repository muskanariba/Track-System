// src/pages/Opposition/OppositionDocuments.jsx
import React, { useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const OppositionDocuments = () => {
  const [file, setFile] = useState(null);
  const [remark, setRemark] = useState("");
  const [showToClient, setShowToClient] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a document");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("document", file);
      formData.append("remark", remark);
      formData.append("showToClient", showToClient);

      await api.post("/opposition-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Document uploaded successfully");

      setFile(null);
      setRemark("");
      setShowToClient(false);

    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Opposition Documents
        </h2>
    
      </div>

      {/* FORM */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-3xl">
        <form onSubmit={handleUpload} className="space-y-4">

          {/* FILE */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Image / Document (Max 2MB)
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          {/* SHOW TO CLIENT */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showToClient}
              onChange={(e) => setShowToClient(e.target.checked)}
            />
            <span className="text-sm text-gray-700">Show to Client</span>
          </div>

          {/* REMARK */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Remark
            </label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full border border-gray-300 rounded p-2"
              rows="3"
              placeholder="Enter document remarks"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OppositionDocuments;
