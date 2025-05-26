
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Pages/AdminNew/Sidebar/Sidebar';
import './AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;