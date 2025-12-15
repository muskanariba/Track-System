// src/pages/User/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => { fetchMyApplications(); }, []);

  const fetchMyApplications = async () => {
    try {
      const res = await api.get('/user/my-applications'); // backend endpoint
      setApplications(res.data);
    } catch (err) { console.error(err); alert('Failed to fetch your applications'); }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <h3 className="text-xl font-semibold mb-2">My Applications</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Application No</th>
            <th className="border px-2 py-1">Trademark</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Class</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{app.applicationNumber}</td>
              <td className="border px-2 py-1">{app.trademarkName}</td>
              <td className="border px-2 py-1">{app.status}</td>
              <td className="border px-2 py-1">{app.classId?.classNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
