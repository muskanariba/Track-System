import React, { useState } from "react";
import api from "../../api/api";
import { toast } from "react-toastify";

const OppositionFormEntries = () => {
  const [searchBy, setSearchBy] = useState("applicationNumber");
  const [searchValue, setSearchValue] = useState("");

  const [form, setForm] = useState({
    oppositionNumber: "",
    oppositionType: "",
    status: "",
    trademark: "",
    otherTrademark: "",
    remarks: "",
    formNo: "",
    filingDate: "",
    formRemark: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔍 SEARCH APPLICATION
  const handleSearch = async () => {
    if (!searchValue) {
      toast.warning("Please enter Application Number");
      return;
    }

    try {
      setLoading(true);
      const res = await api.get(`/oppositions/search`, {
        params: { [searchBy]: searchValue }
      });

      if (!res.data?.data) {
        toast.info("No record found");
        return;
      }

      setForm(res.data.data);
      toast.success("Record loaded");
    } catch {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // 💾 SAVE / UPDATE
  const handleSave = async () => {
    try {
      await api.post("/oppositions/forms", form);
      toast.success("Form entry saved successfully");
    } catch {
      toast.error("Save failed");
    }
  };

  // 🗑 DELETE
  const handleDelete = async () => {
    toast.info(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p className="font-semibold text-sm">Delete this form entry?</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={async () => {
                try {
                  await api.delete(`/oppositions/forms/${form._id}`);
                  toast.success("Entry deleted");
                  setForm({});
                } catch {
                  toast.error("Delete failed");
                }
                closeToast();
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="bg-gray-300 px-3 py-1 rounded"
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
      <h2 className="text-2xl font-semibold mb-2">
        Opposition Form Entries
      </h2>

      
      {/* 🔍 SEARCH BAR */}
      <div className="bg-white p-4 border rounded mb-6 flex gap-3 items-end">
        <div>
          <label className="text-sm">Search By</label>
          <select
            className="border p-2 ml-2"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          >
            <option value="applicationNumber">Application #</option>
          </select>
        </div>

        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border p-2"
          placeholder="Enter Application #"
        />

        <button
          onClick={handleSearch}
          className="bg-gray-300 px-4 py-2 border"
        >
          Search
        </button>
      </div>

      {/* 📋 FORM */}
      <div className="bg-white border rounded">
        <div className="bg-gray-300 px-4 py-2 border-b">
          <h3 className="font-semibold">Opposition Form Entries</h3>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4 text-sm">
          <input
            placeholder="Opposition # / Rect #"
            value={form.oppositionNumber || ""}
            onChange={(e) =>
              setForm({ ...form, oppositionNumber: e.target.value })
            }
            className="border p-2 col-span-2"
          />

          <input
            placeholder="Trademark"
            value={form.trademark || ""}
            onChange={(e) =>
              setForm({ ...form, trademark: e.target.value })
            }
            className="border p-2"
          />

          <input
            placeholder="Other Side Trademark"
            value={form.otherTrademark || ""}
            onChange={(e) =>
              setForm({ ...form, otherTrademark: e.target.value })
            }
            className="border p-2"
          />

          <textarea
            placeholder="Remarks"
            value={form.remarks || ""}
            onChange={(e) =>
              setForm({ ...form, remarks: e.target.value })
            }
            className="border p-2 col-span-2"
          />

          {/* GREEN BOX */}
          <div className="col-span-2 border border-gray-500 p-4">
            <select
              className="border p-2 w-full mb-3"
              value={form.formNo || ""}
              onChange={(e) =>
                setForm({ ...form, formNo: e.target.value })
              }
            >
              <option value="">Select Form #</option>
              <option value="TM-O">TM-O</option>
              <option value="TM-OA">TM-OA</option>
            </select>

            <input
              type="date"
              value={form.filingDate || ""}
              onChange={(e) =>
                setForm({ ...form, filingDate: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <textarea
              placeholder="Form Remark"
              value={form.formRemark || ""}
              onChange={(e) =>
                setForm({ ...form, formRemark: e.target.value })
              }
              className="border p-2 w-full"
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between px-6 pb-6">
          <button
            onClick={handleDelete}
            className="bg-gray-300 px-4 py-2 border"
          >
            Delete
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-gray-700 text-white px-4 py-2"
            >
              Save
            </button>
            <button
              onClick={() => setForm({})}
              className="bg-gray-300 px-4 py-2 border"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OppositionFormEntries;
