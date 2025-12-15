// src/pages/User/MyApplications.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/user/my-applications'); // backend endpoint
      setApplications(res.data);
    } catch (err) { console.error(err); alert('Failed to fetch applications'); }
  };

  const filteredApps = applications.filter(app =>
    app.applicationNumber?.toLowerCase().includes(search.toLowerCase()) ||
    app.trademarkName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Applications</h2>
      <input
        type="text"
        placeholder="Search by Application No / Trademark"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="mb-3 p-2 border rounded w-full"
      />
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
          {filteredApps.map(app => (
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

export default MyApplications;
