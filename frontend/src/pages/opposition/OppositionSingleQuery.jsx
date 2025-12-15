import React, { useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const OppositionSingleQuery = () => {
  const [searchBy, setSearchBy] = useState("oppositionNo");
  const [searchValue, setSearchValue] = useState("");
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      toast.error("Please enter search value");
      return;
    }

    try {
      setLoading(true);
      setRecord(null);

      const res = await api.post("/reports/opposition-single", {
        searchBy,
        value: searchValue.trim(),
      });

      if (!res.data?.data) {
        toast.info("No record found");
        return;
      }

      setRecord(res.data.data);
      toast.success("Record loaded successfully");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ===== SEARCH BAR ===== */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Opposition Single Query
        </h2>

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-3 items-end"
        >
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Search By</label>
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="oppositionNo">Opp.# / Rect.#</option>
              <option value="clientName">Client Name</option>
              <option value="trademark">Trademark</option>
              <option value="applicationNo">Application #</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-1 block">Value</label>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter value"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* ===== DETAILS ===== */}
      {record && (
        <>
          {/* Opposition Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">
              Opposition Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><b>Opp.#:</b> {record.oppositionNumber}</p>
              <p><b>File #:</b> {record.fileNumber}</p>
              <p><b>Opposition Date:</b> {new Date(record.oppositionDate).toLocaleDateString()}</p>
              <p><b>Type:</b> {record.oppositionType}</p>
              <p><b>Status:</b> {record.status}</p>
              <p className="md:col-span-2">
                <b>Remarks:</b> {record.remarks || "-"}
              </p>
            </div>
          </div>

          {/* Trademark Details */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">
              Trademark Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <p><b>Application #:</b> {record.applicationNumber}</p>
              <p><b>Client:</b> {record.clientName}</p>
              <p><b>Trademark:</b> {record.trademark}</p>
              <p><b>Status:</b> {record.tmStatus}</p>
              <p className="md:col-span-2">
                <b>Goods:</b> {record.goods || "-"}
              </p>
              <p><b>Period of Use:</b> {record.periodOfUse || "-"}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OppositionSingleQuery;
