import React, { useState } from "react";
import api from "../../api/api";

const OppositionReminderReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Please select start and end date");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/reports/opposition-reminders", {
        startDate,
        endDate,
        clientId: clientId || undefined
      });

      setResults(res.data.data || []);
    } catch (err) {
      console.error("Report Error:", err.response?.data || err);
      alert("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          TM Opposition Reminder Report
        </h2>

        <form
          onSubmit={handleGenerate}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Start Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Reminder Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Reminder End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 outline-none"
            />
          </div>

          {/* Client (optional – ID based) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Applicant (Optional)
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Client ID (optional)"
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

      {/* Results Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Report Results
        </h3>

        {results.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No reminders found for selected period.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left text-sm">Application #</th>
                  <th className="border px-3 py-2 text-left text-sm">Trademark</th>
                  <th className="border px-3 py-2 text-left text-sm">Reminder Date</th>
                  <th className="border px-3 py-2 text-left text-sm">Remark</th>
                  <th className="border px-3 py-2 text-left text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-3 py-2 text-sm">
                      {item.applicationNumber}
                    </td>
                    <td className="border px-3 py-2 text-sm">
                      {item.trademark}
                    </td>
                    <td className="border px-3 py-2 text-sm">
                      {new Date(item.reminderDate).toLocaleDateString()}
                    </td>
                    <td className="border px-3 py-2 text-sm">
                      {item.reminderRemark || "-"}
                    </td>
                    <td className="border px-3 py-2 text-sm">
                      {item.status || "-"}
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

export default OppositionReminderReport;
