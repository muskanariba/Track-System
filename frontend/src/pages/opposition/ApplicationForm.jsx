// src/pages/Opposition/OppositionApplicationDetails.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";

const ApplicationForm = () => {
  const [form, setForm] = useState({
    oppNo: "",
    fileNo: "",
    oppositionDate: "",
    oppositionType: "",
    status: "",
    remarks: "",

    applicationNo: "",
    client: "",
    trademark: "",
    goods: "",
    periodOfUse: "",

    journalNo: "",
    journalDate: "",
    publicationDate: "",

    otherTrademark: "",
    otherClass: "",
    otherGoods: "",

    reminderDate: "",
    reminderText: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    toast.success("Opposition details saved successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow border border-gray-200 p-6 space-y-8">

        <h2 className="text-2xl font-semibold text-gray-800">
          Opposition – Application Details
        </h2>

        {/* ================= OPPOSITION ENTRY ================= */}
        <Section title="Opposition Entry">
          <Grid>
            <Input label="Opp.# / Rect.#" name="oppNo" onChange={handleChange} />
            <Input label="File #" name="fileNo" onChange={handleChange} />
            <Input type="date" label="Opposition Date" name="oppositionDate" onChange={handleChange} />
            <Select label="Opposition Type" name="oppositionType" options={["Applicant", "Opponent"]} />
            <Select label="Status" name="status" options={["Pending", "Closed"]} />
          </Grid>

          <Textarea label="Remarks" name="remarks" onChange={handleChange} />
        </Section>

        {/* ================= TRADEMARK DETAILS ================= */}
        <Section title="Trademark Details">
          <Grid>
            <Input label="Application #" name="applicationNo" onChange={handleChange} />
            <Input label="Our Client" name="client" onChange={handleChange} />
            <Input label="Trademark" name="trademark" onChange={handleChange} />
          </Grid>

          <Textarea label="Goods" name="goods" onChange={handleChange} />

          <Input label="Period of Use" name="periodOfUse" onChange={handleChange} />
        </Section>

        {/* ================= JOURNAL DETAILS ================= */}
        <Section title="Journal Details">
          <Grid>
            <Input label="TM Journal #" name="journalNo" onChange={handleChange} />
            <Input type="date" label="Journal Date" name="journalDate" onChange={handleChange} />
            <Input type="date" label="Publication Date" name="publicationDate" onChange={handleChange} />
          </Grid>
        </Section>

        {/* ================= OTHER SIDE DETAILS ================= */}
        <Section title="Other Side Trademark Details">
          <Grid>
            <Input label="Trademark" name="otherTrademark" onChange={handleChange} />
            <Input label="Class" name="otherClass" onChange={handleChange} />
          </Grid>

          <Textarea label="Goods" name="otherGoods" onChange={handleChange} />
        </Section>

        {/* ================= REMINDER ================= */}
        <Section title="Reminder">
          <Input type="date" label="Reminder Date" name="reminderDate" onChange={handleChange} />
          <Textarea label="Reminder Text" name="reminderText" onChange={handleChange} />
        </Section>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
          >
            Save
          </button>

          <button
            onClick={() => toast.info("Cancelled")}
            className="px-6 py-2 border border-gray-400 text-gray-700 rounded-md"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default ApplicationForm;

/* ================= SMALL COMPONENTS ================= */

const Section = ({ title, children }) => (
  <div className="border border-gray-200 rounded-md">
    <div className="bg-gray-50 px-4 py-2 font-medium text-gray-700 border-b">
      {title}
    </div>
    <div className="p-4 space-y-4">{children}</div>
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
);

const Input = ({ label, type = "text", name, onChange }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400"
    />
  </div>
);

const Textarea = ({ label, name, onChange }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <textarea
      name={name}
      rows={3}
      onChange={onChange}
      className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400"
    />
  </div>
);

const Select = ({ label, name, options }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <select
      name={name}
      className="w-full mt-1 p-2 border border-gray-300 rounded"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);
