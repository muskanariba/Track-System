import React, { useEffect, useState } from "react";
import api from "../../api/api";

const AddUser = () => {

  const [form, setForm] = useState({
    userId: "",
    fullName: "",
    email: "",
    password: "",
    roleId: "",
  });

  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState({
    add: false,
    edit: false,
    delete: false,
    print: false,
    view: false,
    setup: false,
  });

  // ✅ LOAD ROLES FROM BACKEND
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        setRoles(res.data.data || []);
      } catch (err) {
        console.error("Role fetch failed", err);
      }
    };
    fetchRoles();
  }, []);

  // ✅ INPUT HANDLER
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ PERMISSION TOGGLE
  const togglePermission = (key) => {
    setPermissions({ ...permissions, [key]: !permissions[key] });
  };

  // ✅ CREATE USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", {
        ...form,
        permissionsOverride: permissions,
      });

      alert("✅ User Created Successfully");

      setForm({
        userId: "",
        fullName: "",
        email: "",
        password: "",
        roleId: "",
      });

      setPermissions({
        add: false,
        edit: false,
        delete: false,
        print: false,
        view: false,
        setup: false,
      });

    } catch (err) {
      alert(err.response?.data?.message || "User creation failed");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New User</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

        <input name="userId" value={form.userId} onChange={handleChange} placeholder="User ID" className="p-3 border rounded" required />

        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="p-3 border rounded" required />

        <input name="email" value={form.email} onChange={handleChange} placeholder="Email (Optional)" className="p-3 border rounded" />

        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" className="p-3 border rounded" required />

        {/* ✅ ROLE DROPDOWN */}
        <select name="roleId" value={form.roleId} onChange={handleChange} className="p-3 border rounded col-span-2" required>
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.roleName}
            </option>
          ))}
        </select>

        {/* ✅ PERMISSIONS */}
        <div className="col-span-2 grid grid-cols-3 gap-4 mt-4">
          {["add", "edit", "delete", "print", "view", "setup"].map((p) => (
            <label key={p} className="flex items-center gap-2">
              <input type="checkbox" checked={permissions[p]} onChange={() => togglePermission(p)} />
              {p.toUpperCase()}
            </label>
          ))}
        </div>

        <div className="col-span-2 text-right mt-6">
          <button className="bg-gray-800 text-white px-6 py-3 rounded">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
