// src/pages/User/Documents.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/api';

const Documents = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get('/user/my-applications'); // backend endpoint
      setApplications(res.data);
    } catch (err) { console.error(err); alert('Failed to fetch applications'); }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Documents</h2>
      {applications.map(app => (
        <div key={app._id} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{app.trademarkName} ({app.applicationNumber})</h3>
          {app.documents && app.documents.length > 0 ? (
            <ul className="list-disc ml-6">
              {app.documents.map(doc => (
                <li key={doc._id}>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No documents uploaded yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Documents;
