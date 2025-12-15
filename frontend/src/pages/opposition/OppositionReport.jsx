import React, { useState } from "react";
import api from "../../api/api";

const OppositionReport = () => {
  const [form, setForm] = useState({
    oppositionNo: "",
    startDate: "",
    endDate: "",
    oppositionType: "",
    status: "",
    journalNo: "",
    clientId: "",
    trademark: "",
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/reports/opposition", {
        ...form,
        clientId: form.clientId || undefined,
      });

      setResults(res.data.data || []);
    } catch (err) {
      console.error("Opposition Report Error:", err.response?.data || err);
      alert("Failed to generate opposition report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= HEADER + FORM ================= */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Opposition Report
        </h2>

        <form
          onSubmit={handleGenerate}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Opposition No */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Opp./Rect. #
            </label>
            <input
              name="oppositionNo"
              value={form.oppositionNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Starting Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          {/* Opposition Type */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Opposition Type
            </label>
            <select
              name="oppositionType"
              value={form.oppositionType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-gray-400 outline-none"
            >
              <option value="">Select Opposition Type</option>
              <option value="Notice">Notice</option>
              <option value="Counter">Counter</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-gray-400 outline-none"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Disposed">Disposed</option>
            </select>
          </div>

          {/* Journal No */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Trademark Journal #
            </label>
            <input
              name="journalNo"
              value={form.journalNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Our Client
            </label>
            <input
              name="clientId"
              value={form.clientId}
              onChange={handleChange}
              placeholder="Client ID (optional)"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          {/* Trademark */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Trademark
            </label>
            <input
              name="trademark"
              value={form.trademark}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          {/* Button */}
          <div className="md:col-span-3 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </div>

      {/* ================= RESULTS ================= */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Report Results
        </h3>

        {results.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No opposition records found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-sm text-left">Opp. #</th>
                  <th className="border px-3 py-2 text-sm text-left">Trademark</th>
                  <th className="border px-3 py-2 text-sm text-left">Client</th>
                  <th className="border px-3 py-2 text-sm text-left">Status</th>
                  <th className="border px-3 py-2 text-sm text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-3 py-2 text-sm">
                      {row.oppositionNumber}
                    </td>
                    <td className="border px-3 py-2 text-sm">
                      {row.trademark}
                    </td>
                    <td className="border px-3 py-2 text-sm">
                      {row.clientName || "-"}
                    </td>
                    <td className="border px-3 py-2 text-sm">
                      {row.status}
                    </td>
                    <td className="border px-3 py-2 text-sm">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OppositionReport;
