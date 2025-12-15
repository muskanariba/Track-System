// src/pages/TM/TMDocuments.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const TMDocuments = ({ applicationId }) => {
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [showToClient, setShowToClient] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ------------------------------------
     FETCH APPLICATION BASIC INFO
  ------------------------------------ */
  const fetchApplication = async () => {
    try {
      const res = await api.get(`/tm-applications/${applicationId}`);
      setApplication(res.data);
    } catch {
      toast.error("Failed to load application details");
    }
  };

  /* ------------------------------------
     FETCH DOCUMENTS
  ------------------------------------ */
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/tm-documents/${applicationId}`);
      setDocuments(res.data || []);
    } catch {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (applicationId) {
      fetchApplication();
      fetchDocuments();
    }
  }, [applicationId]);

  /* ------------------------------------
     UPLOAD DOCUMENT
  ------------------------------------ */
  const handleUpload = async () => {
    if (!file) return toast.error("Please select a document");

    if (file.size > 2 * 1024 * 1024) {
      return toast.error("File size must not exceed 2MB");
    }

    try {
      const formData = new FormData();
      formData.append("applicationId", applicationId);
      formData.append("document", file);
      formData.append("remarks", remarks);
      formData.append("showToClient", showToClient);

      await api.post("/tm-documents", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Document uploaded successfully");

      setFile(null);
      setRemarks("");
      setShowToClient(false);

      fetchDocuments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  /* ------------------------------------
     DELETE DOCUMENT
  ------------------------------------ */
  const handleDelete = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold">Delete this document?</p>
          <div className="flex justify-end gap-3">
            <button
              className="bg-red-600 text-white px-4 py-1 rounded"
              onClick={async () => {
                try {
                  await api.delete(`/tm-documents/${id}`);
                  toast.success("Document deleted");
                  fetchDocuments();
                } catch {
                  toast.error("Delete failed");
                }
                closeToast();
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-4 py-1 rounded"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  /* ------------------------------------
     UI
  ------------------------------------ */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white border rounded-lg shadow">

        {/* HEADER */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-800">
            TM Documents
          </h2>
        </div>

        {/* APPLICATION INFO */}
        {application && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Info label="Application #" value={application.applicationNumber} />
            <Info label="File #" value={application.fileNumber} />
            <Info label="Trademark" value={application.trademark} />
            <div className="md:col-span-3">
              <Info label="Goods" value={application.goods} multiline />
            </div>
          </div>
        )}

        {/* UPLOAD SECTION */}
        <div className="m-6 p-4 border rounded bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">
                Image / Document (Max 2MB)
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Remarks</label>
              <input
                type="text"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={showToClient}
                onChange={(e) => setShowToClient(e.target.checked)}
              />
              <span className="text-sm text-gray-700">Show to Client</span>
            </div>
          </div>

          <button
            onClick={handleUpload}
            className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
          >
            Update
          </button>
        </div>

        {/* DOCUMENT LIST */}
        <div className="p-6">
          <table className="w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Document</th>
                <th className="border p-2">Show to Client</th>
                <th className="border p-2">Remarks</th>
                <th className="border p-2">Delete</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No documents found
                  </td>
                </tr>
              ) : (
                documents.map((doc, i) => (
                  <tr key={doc._id} className="text-center">
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2 text-blue-600 cursor-pointer">
                      <a href={doc.fileUrl} target="_blank" rel="noreferrer">
                        Download
                      </a>
                    </td>
                    <td className="border p-2">
                      {doc.showToClient ? "Yes" : "No"}
                    </td>
                    <td className="border p-2">{doc.remarks || "-"}</td>
                    <td
                      className="border p-2 text-red-600 cursor-pointer"
                      onClick={() => handleDelete(doc._id)}
                    >
                      Delete
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default TMDocuments;

/* ---------------- HELPERS ---------------- */

const Info = ({ label, value, multiline }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    {multiline ? (
      <textarea
        value={value || ""}
        disabled
        rows={3}
        className="w-full mt-1 p-2 border rounded bg-gray-100"
      />
    ) : (
      <input
        value={value || ""}
        disabled
        className="w-full mt-1 p-2 border rounded bg-gray-100"
      />
    )}
  </div>
);
