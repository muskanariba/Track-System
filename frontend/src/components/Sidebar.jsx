// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  let menuItems = [];

  if (role === 'admin') {
    menuItems = [
      { name: 'Dashboard', path: '/admin' },
      { name: 'Countries', path: '/admin/setups/countries' },
      { name: 'Cities', path: '/admin/setups/cities' },
      { name: 'Users', path: '/admin/setups/users' },
      { name: 'New Application', path: '/admin/tm/new-application' },
      { name: 'Applications List', path: '/admin/tm/application-list' },
      { name: 'Hearings', path: '/admin/tm/hearings' },
      { name: 'TM Report', path: '/admin/reports/tm-report' },
    ];
  } else if (role === 'agent') {
    menuItems = [
      { name: 'Dashboard', path: '/agent' },
      { name: 'New Application', path: '/agent/new-application' },
      { name: 'Tracking', path: '/agent/tracking' },
    ];
  } else if (role === 'user') {
    menuItems = [
      { name: 'Dashboard', path: '/user' },
      { name: 'My Applications', path: '/user/my-applications' },
      { name: 'Documents', path: '/user/documents' },
    ];
  }

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">AccMaster</div>
      <nav className="flex-1">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="block px-4 py-2 hover:bg-gray-700"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
