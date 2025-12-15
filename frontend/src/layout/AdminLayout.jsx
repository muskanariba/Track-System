import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


const AdminLayout = ({ children }) => {
return (
<div className="flex min-h-screen">
<Sidebar />
<div className="flex-1 flex flex-col">
<Navbar />
<main className="p-6 bg-gray-100 flex-1 overflow-auto">
{children}
</main>
</div>
</div>
);
};


export default AdminLayout;