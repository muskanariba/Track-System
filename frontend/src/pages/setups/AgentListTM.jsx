import React, { useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const AgentListTM = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  // ✅ FETCH AGENTS (ON GENERATE)
  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/agents");

      // 🔴 IMPORTANT: backend usually returns { data: [] }
      setAgents(res.data.data || res.data || []);
      setGenerated(true);

      toast.success("Agent list loaded");
    } catch {
      toast.error("Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE WITH CONFIRM TOAST
  const handleDelete = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-sm">Delete this Agent?</p>

          <div className="flex justify-end gap-3">
            <button
              onClick={async () => {
                try {
                  await api.delete(`/agents/${id}`);
                  toast.success("Agent Deleted Successfully");
                  fetchAgents();
                } catch {
                  toast.error("Delete Failed");
                }
                closeToast();
              }}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Yes
            </button>

            <button
              onClick={closeToast}
              className="bg-gray-300 px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* PAGE TITLE */}
      <h2 className="text-2xl font-semibold mb-2">Agent List – TM</h2>
    

      {/* HEADER BOX (Customer List Style) */}
      <div className="bg-white border border-gray-300 rounded-lg mb-6">
        <div className="bg-green-100 px-4 py-3 border-b border-gray-300 rounded-t-lg">
          <h3 className="font-semibold text-gray-800">
            List of Registered Agents
          </h3>
        </div>

        <div className="p-4">
          <button
            onClick={fetchAgents}
            disabled={loading}
            className="px-4 py-1 bg-gray-300 hover:bg-gray-400 border border-gray-500 text-sm"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      {generated && (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          {loading ? (
            <p className="text-center text-gray-500">Loading agents...</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">#</th>
                  <th className="border p-2">Agent Name</th>
                  <th className="border p-2">City</th>
                  <th className="border p-2">Country</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Delete</th>
                </tr>
              </thead>

              <tbody>
                {agents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      No Agents Found
                    </td>
                  </tr>
                ) : (
                  agents.map((agent, index) => (
                    <tr key={agent._id} className="text-center hover:bg-gray-50">
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{agent.agentName}</td>
                      <td className="border p-2">{agent.city}</td>
                      <td className="border p-2">{agent.country}</td>
                      <td className="border p-2">{agent.phone}</td>
                      <td className="border p-2">{agent.email}</td>
                      <td
                        onClick={() => handleDelete(agent._id)}
                        className="border p-2 text-red-600 cursor-pointer"
                      >
                        Delete
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentListTM;
